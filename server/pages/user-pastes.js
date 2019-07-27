'use strict';

const getPastesByUser = require('../db/get-pastes-by-user');


module.exports = function userPastesPageRoute({ router, db }) {
  router.get('/user/:id/pastes', async (req, res, next) => getPastesByUser(db, req.params.id)
    .then(([pastes, user]) => {
      Object.assign(res.locals, pastes, user);
      next();
    })
    .catch(next));
};
