const config = require('./config');
const express = require('express');
const app = express();

const staticDir = config.get('staticDir');
app.use(express.static(staticDir));

const port = config.get('httpPort');
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
