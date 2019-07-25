'use strict';

const getPasteById = require('../db/get-paste-by-id');


module.exports = function pasteByIdPageRoute({ router, db }) {
  router.get('/paste/:id', async (req, res, next) => getPasteById(db, req.params.id)
    .then((paste) => {
      res.locals.paste = paste;
    })
    .catch((error) => {
      if (error.message === 'Paste not found.') res.sendStatus(404);
      else next(error);
    }));
};
