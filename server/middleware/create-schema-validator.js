'use strict';

module.exports = function createSchemaValidator(schema) {
  return async (req, res, next) => schema
    .validate(req.body)
    .then((result) => {
      next();
      return result;
    })
    .catch((errors) => {
      res
        .status(400)
        .json({ errors });
    });
};
