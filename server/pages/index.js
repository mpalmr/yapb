'use strict';

const express = require('express');
const pasteByIdRoute = require('./paste-by-id');
const userByIdRoute = require('./user-by-id');


module.exports = function pageRoutes({ server, handle, ...routeDependencies }) {
  const router = express();

  const app = { ...routeDependencies, router };
  pasteByIdRoute(app);
  userByIdRoute(app);

  router.use(handle);
  server.use(router);
};
