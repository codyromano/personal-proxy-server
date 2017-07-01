const express = require('express');

class PublicStaticServer {
  constructor(rootDir) {
    this.root = rootDir;
    this.app = express();
    this.app.use(express.static(rootDir));
  }
  listen(port) {
    console.log(`Static server running on ${port}`);
    this.app.listen(port);
  }
}

module.exports = PublicStaticServer;