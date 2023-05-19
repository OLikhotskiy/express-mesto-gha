const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const {
  ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER, ERROR_CONFLICT,
} = require('./constants');

module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof CastError) {
    return res.status(ERROR_BAD_REQUEST).send({ message: `Отправлен неправильный запрос ${ERROR_BAD_REQUEST}` });
  }

  if (err instanceof DocumentNotFoundError) {
    return res.status(ERROR_NOT_FOUND).send({ message: `Cервер не может найти данные согласно запросу ${ERROR_NOT_FOUND}` });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  if (err.code === 11000) {
    return res
      .status(ERROR_CONFLICT)
      .send({ message: 'Такая электронная почта уже зарегистрированна' });
  }

  res.status(ERROR_SERVER).send({ message: `Произошла неожиданная ошибка ${err.name}: ${err.message}` });
  return next();
};
