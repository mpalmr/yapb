'use strict';

const pasteRoute = require('./paste');
const registerRoute = require('./register');


module.exports = function api({ server, ...app }) {
  server.post('/', pasteRoute(app));
  // server.post('/register', registerRoute(app));
};
