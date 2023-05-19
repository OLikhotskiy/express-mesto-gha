const { ERROR_CONFLICT } = require('../utils/constants');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CONFLICT;
  }
}

module.exports = Conflict;
