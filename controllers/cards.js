const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

const Card = require('../models/card');
const { CREATED_CODE, ERROR_NOT_FOUND } = require('../utils/constants');

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
    .populate([
      { path: 'owner', model: 'user' },
    ])
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка удалена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new Forbidden('Невозможно удалить карточку другого пользователя');
      }
      Card.findByIdAndDelete({ _id })
        .populate([
          { path: 'owner', model: 'user' },
        ])
        .then((cardDeleted) => {
          res.send({ data: cardDeleted });
        });
    })
    .catch(next);
};

const checkCard = (card, res) => {
  if (card) {
    return res.send({ data: card });
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: `Карточка не найдена ${ERROR_NOT_FOUND}` });
};

const updateCardLikes = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((user) => checkCard(user, res))
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
