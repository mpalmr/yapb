'use strict';


module.exports = function pasteRoute({ router, db }) {
  router.post('/', async (req, res, next) => db('pastes')
    .insert({ ...req.body, user_id: req.session.id })
    .then((result) => {
      res.json(result);
      return result;
    })
    .catch(next));
};
