'use strict';

const createSchemaValidator = require('../middleware/create-schema-validator');
const { paste: schema } = require('../../validation-schemas');

const validate = createSchemaValidator(schema);


module.exports = function pasteRoute({ router, db }) {
  async function paste(req, res, next) {
    return db.transaction(trx => trx('pastes')
      .insert({ user_id: req.session.uid })
      .returning(['id', 'uuid'])
      .then(([pasteId, pasteUuid]) => Promise.all(req.body
        .map(file => trx('files')
          .insert({ ...file, paste_id: pasteId })))
        .then(trx.commit)
        .catch(trx.rollback)
        .then(() => pasteUuid)))
      .then((pasteUuid) => {
        res
          .status(201)
          .json({ pasteId: pasteUuid });
        return pasteUuid;
      })
      .catch(next);
  }

  router.post('/paste', validate, paste);
};
