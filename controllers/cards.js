const Card = require('../models/card');
const { CREATED_CODE, ERROR_NOT_FOUND } = require('../utils/constants');

const { еrrorsHandler } = require('../utils/handlers');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => еrrorsHandler(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch((err) => еrrorsHandler(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch((err) => еrrorsHandler(err, res));
};

const checkCard = (card, res) => {
  if (card) {
    return res.send({ data: card });
  }
  return res
    .status(ERROR_NOT_FOUND)
    .send({ message: `Карточка не найдена ${ERROR_NOT_FOUND}` });
};

const updateCardLikes = (req, res, updateData) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((user) => checkCard(user, res))
    .catch((err) => еrrorsHandler(err, res));
};

module.exports.likeCard = (req, res) => {
  const owner = req.user._id;
  const newData = { $addToSet: { likes: owner } };
  updateCardLikes(req, res, newData);
};

module.exports.dislikeCard = (req, res) => {
  const owner = req.user._id;
  const newData = { $pull: { likes: owner } };
  updateCardLikes(req, res, newData);
};
