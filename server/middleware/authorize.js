'use strict';

exports.authorizePage = function (req, res, next) {
  if (req.session.uid) next();
  else res.redirect('/');
};

exports.authorizeApi = function (req, res, next) {
  if (req.session.uid) next();
  else res.sendStatus(401);
};
