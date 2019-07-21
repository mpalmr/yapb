import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


function Timestamps({ createdAt, updatedAt }) {
  const times = [
    { label: 'Created', value: createdAt },
    { label: 'Updated', value: updatedAt },
  ]
    .filter(time => time.value);


  return (
    <dl>
      {times.map(time => (
        <Fragment key={time.label}>
          <dt>{time.label}:</dt>
          <dd>{time.value.toLocaleString()}</dd>
        </Fragment>
      ))}

      <style jsx>
        {`
          dl {
            display: flex;
            flex-wrap: wrap;
          }

          dl:empty {
            display: none;
          }

          dt,
          dd {
            width: 50%;
          }
        `}
      </style>
    </dl>
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
