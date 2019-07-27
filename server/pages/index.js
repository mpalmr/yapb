'use strict';

const express = require('express');
const pasteByIdPageRoute = require('./paste-by-id');
const userPastesPageRoute = require('./user-pastes');


module.exports = function pageRoutes({ server, handle, ...routeDependencies }) {
  const router = express();
  const app = { ...routeDependencies, router };

  pasteByIdPageRoute(app);
  userPastesPageRoute(app);

  router.use(handle);
  server.use(router);
};
