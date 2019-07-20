import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


function PastebinFile({ contents, remove, setContents }) {
  return (
    <div>
      <input value={contents} onChange={event => setContents(event.target.value)} />
      <Button variant="danger" onClick={remove}>
        Remove
      </Button>
    </div>
  );
}


PastebinFile.propTypes = {
  contents: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  setContents: PropTypes.func.isRequired,
};


export default PastebinFile;
