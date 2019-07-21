import React from 'react';
import PropTypes from 'prop-types';
import client from '../../client';


function PasteIdPage({ createdAt, updatedAt, ...rawProps }) {
  const props = {
    ...rawProps,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };

  return (
    <p>Paste ID Page</p>
  );
}


PasteIdPage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  contents: PropTypes.string.isRequired,
  creatorEmail: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

PasteIdPage.defaultProps = {
  name: null,
  creatorEmail: null,
};


PasteIdPage.getInitialProps = async function getInitialProps({ query }) {
  return client.get(`/paste/${query.id}`);
};


export default PasteIdPage;
