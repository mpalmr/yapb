'use strict';

module.exports = function logoutRoute({ router }) {
  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });
};
