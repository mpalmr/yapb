'use strict';

const argon2 = require('argon2');


module.exports = function api({ server, db }) {
  server.post('/', (req, res, next) => {
    db('pastes')
      .insert(req.body)
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch(next);
  });


  server.post('/register', (req, res, next) => {
    argon2.hash(req.body.password)
      .then(passwordHash => db('users')
        .insert({
          email: req.body.email,
          password: passwordHash,
          github_url: req.body.githubUrl,
        })
        .then((result) => {
          console.log(result);
          res.json(result);
        }))
      .catch(next);
  });
};
