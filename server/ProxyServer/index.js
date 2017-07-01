const createServer = require('./createServer');

class ProxyServer {
  constructor({
    appManifest,
    proxyPort
  }) {
    this.appManifest = appManifest;
    this.proxyPort = proxyPort;
  }

  listen() {
    const { proxyPort } = this;

    createServer.call(this);
    this.server.listen(proxyPort, () =>
      console.log(`Proxy running on ${proxyPort}`)
    );
  }
}

module.exports = ProxyServer;