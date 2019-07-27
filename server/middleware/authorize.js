'use strict';

module.exports = function authorizeMiddleware(req, res, next) {
  if (req.session.uid) next();
  else if (/^\/api\//.test(req.path)) res.sendStatus(401);
  else res.redirect('/');
};
