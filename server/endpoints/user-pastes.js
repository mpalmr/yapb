'use strict';

const getPastesByUser = require('../db/get-pastes-by-user');
const getUserById = require('../db/get-user-by-id');


module.exports = function userPastesEndpoint({ pageRouter, apiRouter, db }) {
  async function query(req, res, next) {
    return Promise.all([
      getPastesByUser(db, req.params.id),
      getUserById(db, req.params.id),
    ])
      .then(([pastes, user]) => {
        res.locals = {
          pastes,
          userId: user.id,
          userEmail: user.email,
        };
        next();
      })
      .catch(next);
  }

  const path = '/user/:id/pastes';
  pageRouter.get(path, query);
  apiRouter.get(path, query);
};
