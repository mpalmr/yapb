'use strict';

module.exports = function pasteRoute({ db }) {
  return async (req, res, next) => db('pastes')
    .insert(req.body)
    .then((result) => {
      res.json(result);
      return result;
    })
    .catch(next);
};
