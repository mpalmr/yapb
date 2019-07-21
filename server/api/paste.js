'use strict';

const createSchemaValidator = require('../middleware/create-schema-validator');
const { paste: schema } = require('../../validation-schemas');

const validate = createSchemaValidator(schema);


module.exports = function createPasteRoute({ router, db }) {
  async function createPaste(req, res, next) {
    let pasteId; // Need this for the response

    return db.transaction(async (trx) => {
      const [{ id, uuid }] = await trx('pastes')
        .insert({ user_id: req.session.uid })
        .returning(['id', 'uuid']);

      pasteId = uuid;

      return Promise.all(req.body
        .map(file => trx('files')
          .insert({ ...file, paste_id: id })))
        .then(trx.commit)
        .catch(trx.rollback);
    })
      .then((result) => {
        res
          .status(201)
          .json({ pasteId });
        return result;
      })
      .catch(next);
  }

  router.post('/paste', validate, createPaste);
};
