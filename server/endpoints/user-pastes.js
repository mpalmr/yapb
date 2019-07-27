'use strict';

module.exports = function userPastesEndpoint({ pageRouter, apiRouter, db }) {
  async function getPastesByUser(userId) {
    return db('pastes')
      .select(
        'pastes.uuid as paste_id',
        'pastes.created_at',
        'pastes.updated_at',
        'files.uuid as file_id',
        'files.name',
        'files.contents',
        'files.updated_at as file_updated_at',
      )
      .innerJoin('files', 'pastes.id', '=', 'files.paste_id')
      .innerJoin('users', 'pastes.user_id', '=', 'users.id')
      .where('users.uuid', '=', userId)
      .then(records => Object.entries(records
        .reduce((acc, { pasteId, ...record }) => ({
          ...acc,
          [pasteId]: {
            id: pasteId,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
            files: ((acc[pasteId] || {}).files || []).concat({
              id: record.fileId,
              name: record.name,
              contents: record.contents,
              updatedAt: record.fileUpdatedAt,
            }),
          },
        }), {}))
        .map(([id, paste]) => ({ ...paste, id })));
  }


  async function getUserById(userId) {
    return db('users')
      .select('uuid as id', 'email')
      .where('uuid', '=', userId)
      .first();
  }


  async function query(req, res, next) {
    return Promise.all([
      getPastesByUser(req.params.id),
      getUserById(req.params.id),
    ])
      .then(([pastes, user]) => {
        res.locals = {
          pastes,
          userId: user.id,
          userEmail: user.email,
        };
        next();
      })
      .catch(next);
  }

  const path = '/user/:id/pastes';
  pageRouter.get(path, query);
  apiRouter.get(path, query);
};
