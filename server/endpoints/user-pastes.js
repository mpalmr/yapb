'use strict';

const sendLocals = require('../middleware/send-locals');
const queryUserById = require('../db/user-by-id');
const queryPastesByUser = require('../db/get-paste-by-id');


module.exports = function userPastesEndpoint({ pageRouter, apiRouter, db }) {
  async function endpoint(req, res, next) {
    return Promise.all([
      queryPastesByUser(db, req.params.id),
      queryUserById(db, req.params.id),
    ])
      .then(([pastes, user]) => {
        res.locals = {
          ...res.locals,
          pastes,
          userId: user.id,
          userEmail: user.email,
        };
        next();
      })
      .catch(next);
  }

  const path = '/user/:id/pastes';
  pageRouter.get(path, endpoint);
  apiRouter.get(path, endpoint, sendLocals);
};
