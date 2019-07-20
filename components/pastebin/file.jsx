import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


function PastebinFile({ contents, remove }) {
  return (
    <div>
      <input value={contents} />
      <Button variant="danger" onClick={remove}>
        Remove
      </Button>
    </div>
  );
}


PastebinFile.propTypes = {
  contents: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};


export default PastebinFile;
