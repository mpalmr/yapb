'use strict';

const pasteRoute = require('./paste');
const registerRoute = require('./register');


module.exports = function api(app) {
  pasteRoute(app);
  registerRoute(app);
};
