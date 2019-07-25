'use strict';

const getPasteById = require('../db/get-paste-by-id');


module.exports = function getPasteByIdApiRoute({ router, db }) {
  router.get('/paste/:id', async (req, res, next) => getPasteById(db, req.params.id)
    .then((paste) => {
      res.json(paste);
    })
    .catch((error) => {
      if (error.message === 'Paste not found.') res.sendStatus(404);
      else next(error);
    }));
};
