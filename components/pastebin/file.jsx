import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { Form, Button } from 'react-bootstrap';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


const removeCss = css.resolve`
  margin-top: .5rem;
`;


function PastebinFile(props) {
  return (
    <div className="file">
      <Form.Group>
        <Form.Label>Filename</Form.Label>
        <Form.Control
          type="text"
          value={props.name}
          onChange={event => props.setName(event.target.value)}
        />
      </Form.Group>

      <SimpleCodeEditor
        value={props.contents}
        padding={10}
        highlight={contents => highlight(contents, languages.js)}
        onValueChange={props.setContents}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 14,
          border: '1px solid black',
        }}
      />

      {props.canRemove && (
        <Button className={removeCss.className} variant="danger" onClick={props.remove}>
          Remove
        </Button>
      )}

      <style jsx>
        {`
          .file {
            position: relative;
          }

          .file:not(:first-child) {
            margin-top: 1em;
          }
        `}
      </style>
      {removeCss.styles}
    </div>
  );
}


PastebinFile.propTypes = {
  name: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  canRemove: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setContents: PropTypes.func.isRequired,
};


export default PastebinFile;
