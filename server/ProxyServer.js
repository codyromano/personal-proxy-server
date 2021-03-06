const express = require('express');
const proxy = require('http-proxy-middleware');
const emptyFn = () => {};

class ProxyServer {
  constructor(options = {}) {
    this.app = express();
    this.onBeforeListen = options.onBeforeListen || emptyFn;
  }
  addProxyRoute({ port, path, domain }) {
    const options = {
      target: `http://${domain}:${port}`
    }; 
    this.app.use(path, proxy(options));
  }

  listen(port) {
    this.onBeforeListen(this.app);
    this.app.listen(port);
    console.log(`Proxy server running on ${port}`); // eslint-disable-line no-console
  }
}

module.exports = ProxyServer;
