'use strict';

const argon2 = require('argon2');
const createSchemaValidator = require('../middleware/create-schema-validator');
const { login: schema } = require('../../validation-schemas');

const validate = createSchemaValidator(schema);


module.exports = function loginRoute({ pageRouter, apiRouter, db }) {
  async function protectLoggedIn(req, res, next) {
    if (req.session.uid) res.redirect('/');
    else next();
  }


  async function login(req, res, next) {
    return db('users')
      .select('id', 'email', 'password')
      .where('email', '=', req.body.email)
      .first()
      .then(async (user) => {
        if (!user || !await argon2.verify(user.password, req.body.password)) {
          res.sendStatus(401);
        } else {
          req.session.uid = user.id;
          req.session.email = user.email;
          res.sendStatus(200);
        }
      })
      .catch(next);
  }


  const path = '/login';
  pageRouter.get(path, protectLoggedIn);
  apiRouter.post(path, validate, login);
};
