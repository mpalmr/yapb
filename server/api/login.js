'use strict';

const argon2 = require('argon2');
const createValidatorHandler = require('../middleware/create-validator-middleware');
const validator = require('../../validation/registration');

const validate = createValidatorHandler(validator);


module.exports = function loginRoute({ server, db }) {
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
