'use strict';

module.exports = function api(server) {
  server.post('/', (req, res) => {
    res.send('AY');
  });
};
