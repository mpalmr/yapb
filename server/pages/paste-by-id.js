'use strict';

const getPasteById = require('../db/get-paste-by-id');


module.exports = function pasteByIdPageRoute({ router, db }) {
  async function providePasteData(req, res, next) {
    return getPasteById(db, req.params.id)
      .then((paste) => {
        res.locals.paste = paste;
        return next();
      })
      .catch((error) => {
        if (error.message === 'Paste not found.') res.sendStatus(404);
        return next(error);
      });
  }

  router.get('/paste/:id', providePasteData);
};
