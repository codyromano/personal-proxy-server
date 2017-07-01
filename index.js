const config = require('./config');
const ProxyServer = require('./server/ProxyServer');
const setupDefaultRoute = require('./server/setupDefaultRoute');
const { childAppManifest, httpPort} = config.getAll();

const server = new ProxyServer({
  onBeforeListen: setupDefaultRoute
});

childAppManifest.forEach(childApp =>
  server.addProxyRoute(childApp)
);

server.listen(httpPort);
