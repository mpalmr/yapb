'use strict';

const { Router } = require('express');
const pasteRoute = require('./paste');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const registerRoute = require('./register');


module.exports = function api({ server, db }) {
  const router = Router();
  const app = { router, db };

  pasteRoute(app);
  loginRoute(app);
  logoutRoute(app);
  registerRoute(app);

  server.use('/api', router);
};
