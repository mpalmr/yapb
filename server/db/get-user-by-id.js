'use strict';

module.exports = function getUserById(db, userId) {
  return db('users')
    .select('uuid as id', 'email', 'created_at', 'updated_at')
    .whereRaw('uuid', '=', userId);
};
