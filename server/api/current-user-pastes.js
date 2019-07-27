'use strict';

const authorize = require('../middleware/authorize');
const getPastesByUser = require('../db/get-pastes-by-user');


module.exports = function getCurrentUserPastesApiRoute({ router, db }) {
  router.get('/paste', authorize, async (req, res, next) => getPastesByUser(db, req.session.uid)
    .then((pastes) => {
      res.json({ pastes });
    })
    .catch(next));
};
