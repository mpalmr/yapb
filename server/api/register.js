'use strict';

const argon2 = require('argon2');
const { register: schema } = require('../../validation-schemas');


async function validate(req, res, next) {
  return schema
    .validate(req.body)
    .then((value) => {
      next();
      return value;
    })
    .catch((errors) => {
      res
        .status(400)
        .json({ errors });
    });
}


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
