'use strict';

const argon2 = require('argon2');
const createValidatorHandler = require('../middleware/create-validator-middleware');
const validator = require('../../validation/registration');

const validate = createValidatorHandler(validator);


module.exports = function registerRoute({ server, db }) {
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
        .catch(next));
  }

  server.post('/register', validate, createUser);
};
