'use strict';

module.exports = function createValidatorHandler(validator) {
  return (req, res, next) => {
    const errors = validator(req.body);
    if (Object.keys(errors).length) {
      res
        .status(400)
        .json({ errors });
    } else next();
  };
};
