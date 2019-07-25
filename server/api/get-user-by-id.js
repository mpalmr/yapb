'use strict';

const getUserById = require('../db/get-user-by-id');


module.exports = function getUserByIdApiRoute({ router, db }) {
  router.get('/user/:id', async (req, res, next) => getUserById(db, req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      if (error.message === 'User not found.') res.sendStatus(404);
      else next(error);
    }));
};
