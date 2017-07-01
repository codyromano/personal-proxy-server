const { defaultApp } = require('../config').getAll();
const { path } = defaultApp;

module.exports = function(app) {
  app.get(`${path}?*`, (req, res) => {
    res.end('blog');
  });

  // Default to blog
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