'use strict';

const { paste: schema } = require('../../validation-schemas');


async function validate(req, res, next) {
  return schema
    .validate(req.body)
    .then((value) => {
      next();
      return value;
    })
    .catch((errors) => {
      res
        .status(400)
        .json({ errors });
    });
}


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

  server.post('/', validate, createPaste);
};
