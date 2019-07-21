import React from 'react';
import PropTypes from 'prop-types';


function Timestamps({ createdAt, updatedAt }) {
  return (
    <div className="container">
      {createdAt && (
        <p className="timestamp">
          <span>Created:</span> {createdAt.toLocaleString()}
        </p>
      )}

      {updatedAt && (
        <p className="timestamp">
          <span>Updated:</span> {updatedAt.toLocaleString()}
        </p>
      )}

      <style jsx>
        {`
          .container {
            display: flex;
            justify-content: flex-end;
          }

          .timestamp {
            margin-bottom: 0;
            font-size: .8rem;
          }

          .timestamp:last-of-type {
            margin-bottom: 0;
          }

          .timestamp:not(:last-of-type) {
            margin-right: 1.25rem;
          }

          .timestamp span {
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
