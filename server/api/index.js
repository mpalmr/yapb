'use strict';

const express = require('express');
const pasteRoute = require('./paste');
const getPasteByIdRoute = require('./get-paste-by-id');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const registerRoute = require('./register');


module.exports = function api({ server, db }) {
  const router = express.Router();
  router.use(express.json());

  const app = { router, db };
  pasteRoute(app);
  getPasteByIdRoute(app);
  loginRoute(app);
  logoutRoute(app);
  registerRoute(app);

  server.use('/api', router);
};
