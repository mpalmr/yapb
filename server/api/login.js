'use strict';

const argon2 = require('argon2');
const validator = require('../../validation/registration');


module.exports = function loginRoute({ server, db }) {
  function validate(req, res, next) {
    const errors = validator(req.body);
    if (Object.keys(errors).length) {
      res
        .status(400)
        .json({ errors });
    } else next();
  }


  async function login(req, res, next) {
    return db('users')
      .select('uuid', 'password')
      .where('email', '=', req.body.email)
      .first()
      .then(user => user || {})
      .then(async ({ uuid, password }) => {
        if (await argon2.verify(password, req.body.password)) {
          req.session.uid = uuid;
          res.sendStatus(200);
        } else res.statusStatus(401);
      })
      .catch(next);
  }


  server.post('/login', validate, login);
};
