const ProxyServer = require('./server/ProxyServer');
const StaticServer = require('./server/PublicStaticServer');
const config = require('./config');

new StaticServer(
  config.get('staticDir')
).listen(
  config.get('staticPort')
);

new ProxyServer({
  proxyPort: config.get('httpPort'),
  appManifest: config.get('childAppManifest')
}).listen();