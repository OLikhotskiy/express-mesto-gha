const { ERROR_SERVER } = require('../utils/constants');

class Server extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_SERVER;
  }
}

module.exports = Server;
