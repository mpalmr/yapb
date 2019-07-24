'use strict';

const getPasteById = require('../db/get-paste-by-id');


module.exports = function pasteByIdPageRoute({ server, db, handle }) {
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

  server.get('/paste/:id', providePasteData, handle);
};
