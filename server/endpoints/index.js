'use strict';

const express = require('express');
const userPastesEndpoint = require('./user-pastes');


module.exports = function endpoints({ server, db, handle }) {
  const pageRouter = express.Router();
  const apiRouter = express.Router();
  apiRouter.use(express.json());

  const app = { db, pageRouter, apiRouter };
  userPastesEndpoint(app);

  pageRouter.use(handle);
  apiRouter.use((req, res, next) => {
    res.json(res.locals);
    next();
  });

  server.use(pageRouter);
  server.use('/api', apiRouter);
};
