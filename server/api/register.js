'use strict';

const argon2 = require('argon2');
const createSchemaValidator = require('../middleware/create-schema-validator');
const { register: schema } = require('../../validation-schemas');

const validate = createSchemaValidator(schema);


module.exports = function registerRoute({ router, db }) {
  async function createUser(req, res, next) {
    return argon2
      .hash(req.body.password)
      .then(passwordHash => db('users')
        .insert({
          email: req.body.email,
          password: passwordHash,
          github_url: req.body.githubUrl,
        })
        .then((result) => {
          res.json(result);
          return result;
        })
        .catch((error) => {
          if (error.message.includes('users_email_unique')) {
            res
              .status(400)
              .json({ displayError: 'Email already in use.' });
          } else next(error);
        }));
  }

  router.post('/register', validate, createUser);
};
