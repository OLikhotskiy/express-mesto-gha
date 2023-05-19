const { ERROR_NOTAUTHORIZED } = require('../utils/constants');

class Notauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOTAUTHORIZED;
  }
}

module.exports = Notauthorized;
