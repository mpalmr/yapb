'use strict';

const getUserById = require('../db/get-user-by-id');


module.exports = function userByIdPageRoute({ router, db }) {
  router.get('/user/:id', async (req, res, next) => getUserById(db, req.params.id)
    .then((user) => {
      res.locals.user = user;
    })
    .catch((error) => {
      if (error.message === 'User not found.') res.sendStatus(404);
      else next(error);
    }));
};
