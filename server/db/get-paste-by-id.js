'use strict';

module.exports = async function getPasteById(db, pasteId) {
  const paste = await db('pastes')
    .select('id', 'created_at', 'updated_at', 'user_id')
    .where('uuid', '=', pasteId)
    .first();

  if (!paste) throw new Error('Paste not found.');

  const filesQuery = db('files')
    .select('uuid', 'name', 'contents', 'created_at', 'updated_at')
    .where('paste_id', '=', paste.id)
    .then(files => files
      .map(({ uuid, ...file }) => ({ ...file, id: uuid })));

  const creatorQuery = !paste.userId ? null : db('users')
    .select('email')
    .where('id', '=', paste.userId)
    .first()
    .then(user => (user || {}).email || null);

  return Promise.all([filesQuery, creatorQuery])
    .then(([files, creatorEmail]) => ({
      files,
      creatorEmail,
      createdAt: paste.createdAt,
      updatedAt: paste.updatedAt,
    }));
};
