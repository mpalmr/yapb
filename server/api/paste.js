'use strict';

const validator = require('../../validation/paste');


module.exports = function pasteRoute({ server, db }) {
  function validate(req, res, next) {
    const errors = validator(req.body);
    if (Object.keys(errors).length) {
      res
        .status(400)
        .json({ errors });
    } else next();
  }


  async function createPaste(req, res, next) {
    return db('pastes')
      .insert(req.body)
      .then((result) => {
        res.json(result);
        return result;
      })
      .catch(next);
  }


  server.post('/', validate, createPaste);
};
