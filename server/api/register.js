'use strict';

const argon2 = require('argon2');


module.exports = function registerRoute({ server, db }) {
  function validate(req, res, next) {
    const errors = {};

    if (!req.body.email) errors.email = 'Required';

    if (!req.body.password) errors.password = 'Required';
    else if (req.body.password.length < 6) {
      errors.password = 'Password must be at least six characters';
    }

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
