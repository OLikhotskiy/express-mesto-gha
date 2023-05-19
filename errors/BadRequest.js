const { ERROR_BAD_REQUEST } = require('../utils/constants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST;
  }
}

module.exports = BadRequest;
