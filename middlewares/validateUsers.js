const { Joi, celebrate } = require('celebrate');
const { REGEXP } = require('../utils/constants');

module.exports.validSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEXP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validUserId = celebrate({
  params: Joi.object().keys({ userId: Joi.string().length(24).required().hex() }),
});

module.exports.validUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REGEXP),
  }),
});
