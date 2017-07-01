const path = require('path');
const childAppManifest = require('./applications.json');
const defaultApp = require('./defaultApplication.json');
const paths = require('./paths.json');
const appMode = process.env.NODE_ENV == 'PROD' ? 'PROD' : 'DEV';

const getConfig = () => {
  const rootDir = path.dirname(require.main.filename);

  let config = {};
  Object.assign(config, paths[appMode]);

  return Object.assign(config, {
    httpPort: appMode === 'PROD' ? 80 : 8081,
    staticPort: 8010,
    staticDir: path.join(rootDir, 'static'),
    rootDir,
    errorFilesDir: path.join(rootDir, 'static/errors/'),
    appMode,
    childAppManifest,
    defaultApp
  });
};

module.exports = {
  get(key) {
    const config = getConfig();
    if (config.hasOwnProperty(key)) {
      return config[key];
    } else {
      throw new Error(`Unknown configuration option ${key}`);
    }
  },
  getAll() {
    return getConfig();
  }
};
