import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import client from '../../client';
import ViewPaste from '../../components/view-paste';


function PasteIdPage({
  createdAt,
  updatedAt,
  files: rawFiles,
  ...props
}) {
  const files = rawFiles.map(file => ({
    ...file,
    createdAt: new Date(file.createdAt),
    updatedAt: new Date(file.updatedAt),
  }));

  return (
    <Container>
      <ViewPaste
        {...props}
        files={files}
        createdAt={new Date(createdAt)}
        updatedAt={new Date(updatedAt)}
      />
    </Container>
  );
}


PasteIdPage.propTypes = {
  creatorEmail: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    contents: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })),
};

PasteIdPage.defaultProps = {
  creatorEmail: null,
  files: [],
};


PasteIdPage.getInitialProps = async function getInitialProps({ query }) {
  return client.get(`/paste/${query.id}`);
};


export default PasteIdPage;
