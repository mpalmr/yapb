'use strict';

const argon2 = require('argon2');
const createSchemaValidator = require('../middleware/create-schema-validator');
const { login: schema } = require('../../validation-schemas');
const createToken = require('../../utils/create-token');

const validate = createSchemaValidator(schema);


module.exports = function createUserTokenApiRoute({ router, db }) {
  router.post('/user/token', validate, async (req, res, next) => {
    try {
      const user = await db('users')
        .select('id', 'uuid', 'password')
        .where('email', '=', req.body.email)
        .first();

      if (user && await argon2.verify(user.password, req.body.password)) {
        await db('auth_tokens')
          .returning(['token', 'expires_at', 'created_at'])
          .insert({
            userId: user.id,
            token: await createToken(),
          })
          .then(([result]) => {
            console.log(result);
            res.status(201).json({ ...result, userId: user.uuid });
          });
      } else res.sendStatus(401);
    } catch (ex) {
      next(ex);
    }
  });
};
