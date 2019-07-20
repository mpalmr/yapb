'use strict';

const argon2 = require('argon2');
const { login: schema } = require('../../validation-schemas');


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


module.exports = function loginRoute({ server, db }) {
  async function login(req, res, next) {
    return db('users')
      .select('uuid', 'password')
      .where('email', '=', req.body.email)
      .first()
      .then(async (user) => {
        if (!user || !await argon2.verify(user.password, req.body.password)) {
          res.sendStatus(401);
        } else {
          req.session.uid = user.uuid;
          res.sendStatus(200);
        }
      })
      .catch(next);
  }

  server.post('/login', validate, login);
};
