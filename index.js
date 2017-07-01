const config = require('./config');
const ProxyServer = require('./server/ProxyServer');
const setUpDefaultRoute = require('./server/setUpDefaultRoute');
const { childAppManifest, httpPort} = config.getAll();

const server = new ProxyServer({
  onBeforeListen: setUpDefaultRoute
});

childAppManifest.forEach(childApp =>
  server.addProxyRoute(childApp)
);

server.listen(httpPort);