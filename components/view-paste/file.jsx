import React from 'react';
import PropTypes from 'prop-types';


function ViewPasteFile({
  id,
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
        <dl>
          <dt>Created At:</dt>
          <dd>{createdAt.toLocaleString()}</dd>
          <dt>Modified At:</dt>
          <dd>{updatedAt.toLocaleString()}</dd>
        </dl>
      </div>

      <code>
        {contents}
      </code>
    </div>
  );
}


ViewPasteFile.propTypes = {
  id: PropTypes.string.isRequired,
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
