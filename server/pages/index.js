'use strict';

const pasteByIdPageRoute = require('./paste-by-id');


module.exports = function pageRoutes(app) {
  pasteByIdPageRoute(app);
};
