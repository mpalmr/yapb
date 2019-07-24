'use strict';

module.exports = async function getPasteById(db, pasteId) {
  return db('pastes')
    .select('id', 'created_at', 'updated_at', 'user_id')
    .where('uuid', '=', pasteId)
    .first()
    .then((paste) => {
      if (!paste) throw new Error('Paste not found.');

      const filesQuery = db('files')
        .select('uuid', 'name', 'contents', 'created_at', 'updated_at')
        .where('paste_id', '=', paste.id);

      const creatorQuery = !paste.userId ? null : db('users')
        .select('email')
        .where('id', '=', paste.userId)
        .first();

      return Promise.all([filesQuery, creatorQuery])
        .then(([files, creator]) => ({
          creatorEmail: creator ? creator.email : null,
          createdAt: paste.createdAt,
          updatedAt: paste.updatedAt,
          files: files.map(({ uuid, ...file }) => ({ ...file, id: uuid })),
        }));
    });
};
