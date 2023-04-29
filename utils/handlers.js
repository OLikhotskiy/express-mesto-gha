const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER } = require('./constants');

module.exports.еrrorsHandler = (err, res) => {
  if (err instanceof ValidationError) {
    return res
      .status(ERROR_BAD_REQUEST)
      .send({ message: `Отправлен неправильный запрос ${ERROR_BAD_REQUEST}` });
  }

  if (err instanceof DocumentNotFoundError) {
    return res
      .status(ERROR_NOT_FOUND)
      .send({
        message: `Cервер не может найти данные согласно запросу ${ERROR_NOT_FOUND}`,
      });
  }

  if (err instanceof CastError) {
    return res
      .status(ERROR_BAD_REQUEST)
      .send({ message: `Отправлен неправильный запрос ${ERROR_BAD_REQUEST}` });
  }
  return res
    .status(ERROR_SERVER)
    .send({
      message: `Произошла неожиданная ошибка ${err.name}: ${err.message}`,
    });
};

module.exports.notFound = (req, res) => {
  res
    .status(ERROR_NOT_FOUND)
    .send({ message: 'Cтраница не найдена' });
};
