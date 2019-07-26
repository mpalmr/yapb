'use strict';

const express = require('express');
const authorizeMiddleware = require('../middleware/authorize');
const pasteByIdPageRoute = require('./paste-by-id');
const userPastesPageRoute = require('./user-pastes');


module.exports = function pageRoutes({ server, handle, ...routeDependencies }) {
  const router = express();
  const protectedRouter = express();
  protectedRouter.use(authorizeMiddleware);

  const unprotectedApp = { ...routeDependencies, router };
  router.get('/', pasteByIdPageRoute(unprotectedApp));

  const protectedApp = { ...routeDependencies, router: protectedRouter };
  protectedRouter.get('/paste', userPastesPageRoute(protectedApp));

  router.use(protectedRouter);
  router.use(handle);
  server.use(router);
};
