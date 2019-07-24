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
  createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    contents: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
    updatedAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  })),
};

PasteIdPage.defaultProps = {
  creatorEmail: null,
  files: [],
};


PasteIdPage.getInitialProps = async function getInitialProps({ query, res }) {
  if (!process.browser) return res.locals.paste;
  return client.get(`/paste/${query.id}`);
};


export default PasteIdPage;
