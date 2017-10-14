/*
I'm putting this script on the backburner for now
because it requires that all child applications be
start-able via npm start, and I have apps that run
differently.

Until I put better automation in place, the preferred
method for startng the server is ./start-website.bash.
*/
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
  npmBinaryDir,
  childAppsDir,
  childAppManifest,
  defaultApp
} = config.getAll();

module.exports = function() {
  const commands = [];

  const childAppPaths = childAppManifest
    .concat(defaultApp)
    .map(app => path.join(childAppsDir, app.path));

  childAppPaths.forEach(appPath => {
    commands.push(`${npmBinaryDir} start --prefix ${appPath} &`);
  });

  return Promise.all(
    commands.map(commandPromise)
  );
};
