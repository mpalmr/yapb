'use strict';

module.exports = function getPasteByIdRoute({ router, db }) {
  async function getPasteById(req, res, next) {
    console.log(req);
    return db('pastes')
      .join('files', (join) => {
        join.on('files.paste_id', '=', 'pastes.id');
      })
      .join('users', (join) => {
        join.on('users.id', '=', 'pastes.user_id');
      })
      .select(
        'pastes.created_at',
        'pastes.updated_at',
        'files.uuid',
        'files.name',
        'files.contents',
        'files.created_at',
        'files.updated_at',
        'users.email',
      )
      .where('pastes.uuid', '=', req.params.id)
      .then(files => files.map(({
        uuid,
        email,
        created_at,
        updated_at,
        ...file
      }) => ({
        ...file,
        id: uuid,
        creatorEmail: email,
        createdAt: created_at,
        updatedAt: updated_at,
      })))
      .then((result) => {
        console.log(result);
        res.json(result);
        return result;
      })
      .catch(next);
  }

  router.get('/paste/:id', getPasteById);
};
