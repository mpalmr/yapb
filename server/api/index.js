'use strict';

const { Router } = require('express');
const pasteRoute = require('./paste');
const loginRoute = require('./login');
const registerRoute = require('./register');


module.exports = function api({ server, db }) {
  const router = Router();
  const app = { router, db };

  pasteRoute(app);
  loginRoute(app);
  registerRoute(app);

  server.use('/api', router);
};
