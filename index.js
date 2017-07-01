const config = require('./config');
const ProxyServer = require('./server/ProxyServer');
const { childAppManifest, httpPort} = config.getAll();

const server = new ProxyServer();

childAppManifest.forEach(childApp =>
  server.addProxyRoute(childApp)
);

server.listen(httpPort);
