const usersRouter = require('express').Router();
const { validUserId, validUpdateUser, validUpdateAvatar } = require('../middlewares/validateUsers');

const {
  getUsers, getUserId, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);

usersRouter.get('/:userId', validUserId, getUserId);

usersRouter.patch('/me', validUpdateUser, updateUserInfo);

usersRouter.patch('/me/avatar', validUpdateAvatar, updateUserAvatar);

module.exports = usersRouter;
