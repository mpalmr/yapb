'use strict';

module.exports = async function getUserById(db, userId) {
  const user = await db('users')
    .select('email', 'github_url', 'created_at', 'updated_at')
    .where('uuid', '=', userId)
    .first();

  if (!user) throw new Error('User not found.');

  return user;
};
