import React from 'react';
import PropTypes from 'prop-types';
import Timestamps from '../timestamps';


function ViewPasteFile({
  name,
  contents,
  creatorEmail,
  createdAt,
  updatedAt,
}) {
  return (
    <div>
      <p>
        By {creatorEmail}
      </p>

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
  creatorEmail: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  updatedAt: PropTypes.instanceOf(Date).isRequired,
};

ViewPasteFile.defaultProps = {
  name: null,
  creatorEmail: null,
};


export default ViewPasteFile;
