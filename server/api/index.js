'use strict';

const express = require('express');
const pasteRoute = require('./paste');
const getPasteByIdRoute = require('./get-paste-by-id');
const currentUserPastesApiRoute = require('./current-user-pastes');
const userPastesApiRoute = require('./user-pastes');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const registerRoute = require('./register');
const createUserToken = require('./create-user-token');


module.exports = function api({ server, ...routeDependencies }) {
  const router = express.Router();
  router.use(express.json());

  const app = { ...routeDependencies, router };
  pasteRoute(app);
  getPasteByIdRoute(app);
  currentUserPastesApiRoute(app);
  userPastesApiRoute(app);
  loginRoute(app);
  logoutRoute(app);
  registerRoute(app);
  createUserToken(app);

  server.use('/api', router);
};
