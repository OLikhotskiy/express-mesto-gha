const cardsRouter = require('express').Router();
const { validCard, validCardId } = require('../middlewares/validateCards');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validCard, createCard);
cardsRouter.delete('/:cardId', validCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validCardId, dislikeCard);

module.exports = cardsRouter;
