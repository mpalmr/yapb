'use strict';

module.exports = function api({ server, db }) {
  server.post('/', (req, res, next) => {
    db('pastes')
      .insert(req.body)
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch(next);
  });
};
