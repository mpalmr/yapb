import React from 'react';
import PropTypes from 'prop-types';
import client from '../../client';


function CurrentUserPastes(props) {
  const pastes = props.pastes.map(paste => ({
    ...paste,
    createdAt: new Date(paste.createdAt),
    updatedAt: new Date(paste.updatedAt),
    files: paste.files.map(file => ({
      ...file,
      updatedAt: new Date(file.updatedAt),
    })),
  }));


  return (
    <>
      <h1>Your Pastes</h1>
      {pastes.map(paste => (
        <p key={paste.id}>{paste.id}</p>
      ))}
    </>
  );
}


CurrentUserPastes.propTypes = {
  pastes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      contents: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};


CurrentUserPastes.getInitialProps = async function ({ res }) {
  return process.browser ? client.get('/paste') : { pastes: res.locals.pastes };
};


export default CurrentUserPastes;
