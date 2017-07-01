const proxy = require('http-proxy-middleware');
const { defaultApp } = require('../config').getAll();
const { domain, port, path } = defaultApp;

module.exports = function(app) {
  const options = {
    target: `http://${domain}:${port}`
  }; 
  app.use(path, proxy(options));

  app.get('/', (req, res) => {
    res.redirect(path);
  });

  app.get('*', (req, res) => {
    res.status('404');

    // TODO: Create legit 404 page
    res.type('html').send(`
      <strong>Sorry, I can't find that content...</strong>
    `);
  });

  return app;
};