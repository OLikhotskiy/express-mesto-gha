const { ERROR_NOT_FOUND } = require('../utils/constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND;
  }
}

module.exports = NotFound;
