'use strict';

const createSchemaValidator = require('../middleware/create-schema-validator');
const { paste: schema } = require('../../validation-schemas');


const validate = createSchemaValidator(schema);


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
