'use strict';

module.exports = async function sendLocalsMiddleware(req, res, next) {
  res.json(res.locals);
  next();
};
