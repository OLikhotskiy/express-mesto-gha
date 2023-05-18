const NotFound = require('../errors/NotFound');

module.exports.notFound = (req, res, next) => {
  next(new NotFound('Cтраница не найдена'));
};
