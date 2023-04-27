const User = require('../models/user');
const { OK_CODE, CREATED_CODE, ERROR_NOT_FOUND } = require('../utils/constants');

const { еrrorsHandler } = require('../utils/handlers');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(OK_CODE).send({ data: user }))
    .catch((err) => еrrorsHandler(err, res));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => еrrorsHandler(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE).send(user))
    .catch((err) => еrrorsHandler(err, res));
};

const checkUser = (user, res) => {
  if (user) {
    return res.send({ data: user });
  }
  return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
};

const updateUser = (req, res, updateData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((user) => checkUser(user, res))
    .catch((err) => еrrorsHandler(err, res));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, { name, about });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, { avatar });
};
