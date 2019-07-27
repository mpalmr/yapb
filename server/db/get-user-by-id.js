'use strict';

module.exports = async function getUserById(db, userId) {
  return db('users')
    .select('uuid as id', 'email')
    .where('uuid', '=', userId)
    .first();
};
