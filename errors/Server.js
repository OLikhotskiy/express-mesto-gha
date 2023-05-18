const { ERROR_SERVER } = require('../utils/constants');

class Server extends Error {
  constructor(message) {
    super(message);
    this.type = ERROR_SERVER;
  }
}

module.exports = Server;
