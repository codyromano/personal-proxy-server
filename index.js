const config = require('./config');
const ProxyServer = require('./server/ProxyServer');
const setupDefaultRoute = require('./server/setupDefaultRoute');
const startChildApplications = require('./automation/startChildApplications');
const { childAppManifest, httpPort} = config.getAll();

startChildApplications().then(
  () => console.log('Child applications started'),
  (...args) => console.log('Error starting child apps: ', args)
);

const server = new ProxyServer({
  onBeforeListen: setupDefaultRoute
});

childAppManifest.forEach(childApp =>
  server.addProxyRoute(childApp)
);

server.listen(httpPort);


