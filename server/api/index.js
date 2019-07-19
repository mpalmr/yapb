'use strict';

module.exports = function api(server) {
  server.use('/api/foo', (req, res) => {
    res.json({ a: 1 });
  });
};
