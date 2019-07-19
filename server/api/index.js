'use strict';

const pasteRoute = require('./paste');
const loginRoute = require('./login');
const registerRoute = require('./register');


module.exports = function api(app) {
  pasteRoute(app);
  loginRoute(app);
  registerRoute(app);
};
