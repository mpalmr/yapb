import React from 'react';
import PropTypes from 'prop-types';


function Timestamps({ createdAt, updatedAt }) {
  return (
    <div>
      {createdAt && (
        <p>
          <span>Created:</span> {createdAt.toLocaleString()}
        </p>
      )}

      {updatedAt && (
        <p>
          <span>Updated:</span> {updatedAt.toLocaleString()}
        </p>
      )}

      <style jsx>
        {`
          p {
            margin-bottom: .25rem;
          }

          p:last-of-type {
            margin-bottom: 0;
          }

          span {
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
}


Timestamps.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
  updatedAt: PropTypes.instanceOf(Date),
};

Timestamps.defaultProps = {
  createdAt: null,
  updatedAt: null,
};


export default Timestamps;
