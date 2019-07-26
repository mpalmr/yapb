'use strict';

module.exports = function userPastesPageRoute({ router, db }) {
  router.get('/paste', async (req, res, next) => {
    if (!req.session.uid) res.redirect('/');
  });
};
