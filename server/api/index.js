'use strict';

module.exports = function api(server) {
  server.post('/', (req, res) => {
    console.log(req.body);
    res.send('AY');
  });
};
