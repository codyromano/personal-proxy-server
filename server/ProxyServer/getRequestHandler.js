const url = require('url');

function childAppShouldHandleRequest(fullPath, appPath) {
  fullPath = fullPath.replace('/', '');
  appPath = appPath.replace('/', '');

  return fullPath.startsWith(appPath);
}

function getDefaultProxyTarget() {
  return {
    displayName: 'Static',
    path: '',
    port: 8010
  };
}

function getProxyTarget(req, res, appManifest) {
  const pathname = url.parse(req.url).pathname;

  const target = appManifest.filter(
    app => childAppShouldHandleRequest(pathname, app.path)
  );
  return target.length === 1 ? target[0] : getDefaultProxyTarget();
}

module.exports = function getProxyServerRequestHandler({
  appManifest,
  proxy
}) {
  return (req, res) => {
    const pathname = url.parse(req.url).pathname;
    const targetApp = getProxyTarget(req, res, appManifest);
    const { port } = targetApp;

    const target = `http://localhost:${port}`;
    console.log(`Proxy to ${targetApp.displayName} at ${target}${pathname}`);
    proxy.web(req, res, { target });
  };
};