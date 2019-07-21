import React from 'react';
import PropTypes from 'prop-types';
import ViewPasteFile from './file';


function ViewPaste({ files }) {
  return files.map(file => (
    <ViewPasteFile key={file.id} {...file} />
  ));
}


ViewPaste.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    contents: PropTypes.string.isRequired,
    creatorEmail: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
  })),
};

ViewPaste.defaultProps = {
  files: [],
};


export default ViewPaste;
