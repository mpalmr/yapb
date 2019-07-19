'use strict';

const argon2 = require('argon2');


module.exports = function registerRoute({ db }) {
  return async (req, res, next) => argon2
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
};
