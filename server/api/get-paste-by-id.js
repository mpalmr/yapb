'use strict';

module.exports = function getPasteByIdRoute({ router, db }) {
  async function getPasteById(req, res, next) {
    return db('pastes')
      .select('id', 'created_at', 'updated_at', 'user_id')
      .where('uuid', '=', req.params.id)
      .first()
      .then((paste) => {
        if (!paste) return res.sendStatus(404);

        const filesQuery = db('files')
          .select('uuid', 'name', 'contents', 'created_at', 'updated_at')
          .where('paste_id', '=', paste.id);

        const creatorQuery = !paste.userId ? null : db('users')
          .select('email')
          .where('id', '=', paste.userId)
          .first();

        return Promise.all([filesQuery, creatorQuery])
          .then(([files, creator]) => ({
            creatorEmail: creator.email,
            createdAt: paste.createdAt,
            updatedAt: paste.updatedAt,
            files: files.map(({ uuid, ...file }) => ({ ...file, id: uuid })),
          }))
          .then((fullPaste) => {
            res.json(fullPaste);
            return fullPaste;
          });
      })
      .catch(next);
  }

  router.get('/paste/:id', getPasteById);
};
