const { Joi, celebrate } = require('celebrate');
const { REGEXP } = require('../utils/constants');

module.exports.validCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(REGEXP),
  }),
});

module.exports.validCardId = celebrate({
  params: Joi.object().keys({ cardId: Joi.string().length(24).required().hex() }),
});
