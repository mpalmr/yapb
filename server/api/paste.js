'use strict';

// const createValidatorHandler = require('../middleware/create-validator-middleware');


module.exports = function pasteRoute({ server, db }) {
  async function createPaste(req, res, next) {
    return db('pastes')
      .insert(req.body)
      .then((result) => {
        res.json(result);
        return result;
      })
      .catch(next);
  }

  server.post('/', createPaste);
};
