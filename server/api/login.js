'use strict';

const argon2 = require('argon2');
const createSchemaValidator = require('../middleware/create-schema-validator');
const { login: schema } = require('../../validation-schemas');


const validate = createSchemaValidator(schema);


module.exports = function loginRoute({ router, db }) {
  async function login(req, res, next) {
    return db('users')
      .select('email', 'password')
      .where('email', '=', req.body.email)
      .first()
      .then(async (user) => {
        if (!user || !await argon2.verify(user.password, req.body.password)) {
          res.sendStatus(401);
        } else {
          req.session.email = user.email;
          res.sendStatus(200);
        }
      })
      .catch(next);
  }

  router.post('/login', validate, login);
};
