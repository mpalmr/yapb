import React from 'react';
import PropTypes from 'prop-types';
import Timestamps from '../timestamps';


function ViewPasteFile({
  name,
  contents,
  createdAt,
  updatedAt,
}) {
  return (
    <div>
      <div>
        <h3>{name}</h3>
        <Timestamps createdAt={createdAt} updatedAt={updatedAt} />
      </div>

      <code>
        {contents}
      </code>
    </div>
  );
}


ViewPasteFile.propTypes = {
  name: PropTypes.string,
  contents: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  updatedAt: PropTypes.instanceOf(Date).isRequired,
};

ViewPasteFile.defaultProps = {
  name: null,
};


export default ViewPasteFile;
