'use strict';

module.exports = function pasteRoute({ server, db }) {
  function validate(req, res, next) {
    const errors = {};
    if (!req.body.contents.trim()) errors.contents = 'Required';
    if (Object.keys(errors).length) {
      res
        .status(400)
        .json({ errors });
    } else next();
  }


  async function createUser(req, res, next) {
    return db('pastes')
      .insert(req.body)
      .then((result) => {
        res.json(result);
        return result;
      })
      .catch(next);
  }


  server.post('/', validate, createUser);
};
