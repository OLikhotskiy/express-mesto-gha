const { ERROR_NOTAUTHORIZED } = require('../utils/constants');

class Notauthorized extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_NOTAUTHORIZED;
  }
}

module.exports = Notauthorized;
