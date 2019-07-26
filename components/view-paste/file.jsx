import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import getHighlightLanguage from '../../utils/get-highlight-language';


function ViewPasteFile(props) {
  return (
    <div>
      <h3>{props.name}</h3>

      <SyntaxHighlighter language={getHighlightLanguage(props.name)} style={docco}>
        {props.contents}
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
