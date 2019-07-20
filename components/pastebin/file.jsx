import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


function PastebinFile({ contents, remove, setContents }) {
  return (
    <div>
      <SimpleCodeEditor
        value={contents}
        padding={10}
        highlight={code => highlight(code, languages.js)}
        onValueChange={setContents}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          border: '1px solid black',
        }}
      />
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
