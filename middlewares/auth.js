const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;
const Notauthorized = require('../errors/Notauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Notauthorized('Авторизируйтесь'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret-key');
  } catch (err) {
    next(new Notauthorized('Авторизируйтесь'));
  }
  req.user = payload;
  return next();
};
