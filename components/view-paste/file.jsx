import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';


function getHighlightLanguage(fileName) {
  const splitFileName = fileName.split('.');
  const extension = splitFileName[splitFileName.length - 1];
  return {
    js: 'javascript',
  }[extension] || null;
}


function ViewPasteFile({ name, contents }) {
  return (
    <div>
      <h3>{name}</h3>

      <SyntaxHighlighter language={getHighlightLanguage(name)} style={docco}>
        {contents}
      </SyntaxHighlighter>
    </div>
  );
}


ViewPasteFile.propTypes = {
  name: PropTypes.string,
  contents: PropTypes.string.isRequired,
};

ViewPasteFile.defaultProps = {
  name: null,
};


export default ViewPasteFile;
