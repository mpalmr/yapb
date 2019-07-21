'use strict';

module.exports = function errorMiddleware(error, req, res, next) {
  console.error(error);
  if (res.headersSent) next(error);
  else res.status(500).json(error);
};
