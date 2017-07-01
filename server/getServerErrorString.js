const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = function(errorPage) {
  const fileName = path.join(
    config.get('errorFilesDir'),
    `${errorPage}.html`
  );

  console.log(`Serving error page file ${fileName}`);
  return fs.readFileSync(fileName).toString();
};
