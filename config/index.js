const path = require('path');
const childAppManifest = require('./applications.json');
const appMode = process.env.NODE_ENV == 'PROD' ? 'PROD' : 'DEV';

const getConfig = () => {
  const rootDir = path.dirname(require.main.filename);
  const domains = {
    'PROD': 'codyromano.com',
    'DEV': 'localhost'
  };

  return {
    httpPort: appMode === 'PROD' ? 80 : 8081,
    domain: domains[appMode],
    staticPort: 8010,
    staticDir: path.join(rootDir, 'static'),
    rootDir,
    errorFilesDir: path.join(rootDir, 'static/errors/'),
    appMode,
    childAppManifest
  };
};

module.exports = {
  get(key) {
    const config = getConfig();
    if (config.hasOwnProperty(key)) {
      return config[key];
    } else {
      throw new Error(`Unknown configuration option ${key}`);
    }
  }
};
