'use strict';

module.exports = async function getPastesByUser(db, userId) {
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
    .then(records => ({
      pastes: Object.entries(records
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
        .map(([id, paste]) => ({ ...paste, id })),
    }));
};
