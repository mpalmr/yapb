'use strict';

const argon2 = require('argon2');
const validator = require('../../validation/registration');


module.exports = function registerRoute({ server, db }) {
  function validate(req, res, next) {
    const errors = validator(req.body);
    if (Object.keys(errors).length) {
      res
        .status(400)
        .json({ errors });
    } else next();
  }


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
