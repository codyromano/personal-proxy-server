const path = require('path');
const config = require('../config');
const exec = require('child_process').exec;

const commandPromise = function(command) {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log('Command failed.');
        console.log(`stderr: ${stderr}`);
        reject();
      } else {
        console.log('Command succeeded.');
        resolve();
      }
      console.log(`stdout: ${stdout}`);
    });
  });
};

const {
  foreverBinaryDir,
  npmBinaryDir,
  childAppsDir,
  childAppManifest,
  defaultApp
} = config.getAll();

module.exports = function() {
  const commands = [
    // Stop all forever tasks
    `${foreverBinaryDir} stopall`
  ];

  const childAppPaths = childAppManifest
    .concat(defaultApp)
    .map(app => path.join(childAppsDir, app.path));

  childAppPaths.forEach(appPath => {
    commands.push(`${foreverBinaryDir} ${npmBinaryDir} start --prefix ${appPath} &`);
  });

  return Promise.all(
    commands.map(commandPromise)
  );
};