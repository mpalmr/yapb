'use strict';

const getPasteById = require('../db/get-paste-by-id');


module.exports = function getPasteByIdApiRoute({ router, db }) {
  async function respond(req, res, next) {
    return getPasteById(db, req.params.id)
      .then((paste) => {
        res.json(paste);
        return paste;
      })
      .catch((error) => {
        if (error.message === 'Paste not found.') res.sendStatus(404);
        return next(error);
      });
  }

  router.get('/paste/:id', respond);
};
