const httpProxy = require('http-proxy');
const http = require('http');
const requestHandler = require('./getRequestHandler');
const getErrorString = require('../getServerErrorString');

/**
* @private
* @this ProxyServer
*/
module.exports = function createServer() {
  const { appManifest } = this;
  const proxy = httpProxy.createProxyServer({});
  const handler = requestHandler({ appManifest, proxy });

  this.proxy = proxy;

  this.proxy.on('error', function(err, req, res){
    console.log('Error connecting to child app: ', err);

    res.writeHead(500);
    res.end(
      getErrorString('app-connect-refused')
    );
  });

  this.server = http.createServer(handler);
  return this.server;
};