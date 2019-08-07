'use strict';

const express = require('express');
const loginEndpoint = require('./login');
const currentUserHomeEndpoint = require('./current-user-home');
const userPastesEndpoint = require('./user-pastes');


module.exports = function endpoints({ server, db, handle }) {
  const pageRouter = express.Router();
  const apiRouter = express.Router();
  apiRouter.use(express.json());

  const app = { db, pageRouter, apiRouter };
  loginEndpoint(app);
  currentUserHomeEndpoint(app);
  userPastesEndpoint(app);

  pageRouter.use(handle);
  server.use(pageRouter);
  server.use('/api', apiRouter);
};
