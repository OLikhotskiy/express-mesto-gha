const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserId, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

const { REGEXP } = require('../utils/constants');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).required().hex(),
  }),
}), getUserId);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(REGEXP),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
