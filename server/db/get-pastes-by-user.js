'use strict';

module.exports = async function getPastesByUser(db, userId) {
  return db('pastes')
    .select('name', 'contents', 'created_at', 'updated_at')
    .where('user_id', '=', userId);
};
