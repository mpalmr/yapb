import React from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import ViewPaste from '../../components/view-paste';


function PasteIdPage({ files: rawFiles }) {
  const files = rawFiles.map(file => ({
    ...file,
    createdAt: new Date(file.createdAt),
    updatedAt: new Date(file.updatedAt),
  }));

  return (
    <ViewPaste files={files} />
  );
}


PasteIdPage.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    contents: PropTypes.string.isRequired,
    creatorEmail: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })),
};

PasteIdPage.defaultProps = {
  files: [],
};


PasteIdPage.getInitialProps = async function getInitialProps({ query }) {
  return client.get(`/paste/${query.id}`)
    .then(files => ({ files }));
};


export default PasteIdPage;
