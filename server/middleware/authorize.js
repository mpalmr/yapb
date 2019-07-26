'use strict';

module.exports = function authorizeRoute(req, res, next) {
  if (!req.session.uid) res.redirect(401, '/');
  else next();
};
