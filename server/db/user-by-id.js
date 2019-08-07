'use strict';

module.exports = async function queryUserById(db, userId) {
  return db('users')
    .select('uuid as id', 'email')
    .where('uuid', '=', userId)
    .first();
};
