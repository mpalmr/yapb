import React from 'react';
import PropTypes from 'prop-types';


function ViewPaste({ files }) {
  console.log(files);
  return (
    <div />
  );
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
