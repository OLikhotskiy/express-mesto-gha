const Forbidden = require('../errors/Forbidden');

const Card = require('../models/card');
const { CREATED_CODE } = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const _id = req.params.cardId;

  Card.findOne({ _id })
    .orFail()
    .then((card) => {
      if (card.owner._id.toString() === req.user._id.toString()) {
        card.deleteOne()
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        next(new Forbidden('Невозможно удалить карточку другого пользователя'));
      }
    })
    .catch(next);
};

const updateCardLikes = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .orFail()
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const owner = req.user._id;
  const newData = { $addToSet: { likes: owner } };
  updateCardLikes(req, res, newData, next);
};

module.exports.dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  const newData = { $pull: { likes: owner } };
  updateCardLikes(req, res, newData, next);
};
