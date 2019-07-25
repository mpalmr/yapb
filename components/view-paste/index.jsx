import React from 'react';
import PropTypes from 'prop-types';
import ViewPasteFile from './file';
import Timestamps from '../timestamps';


function ViewPaste(props) {
  return (
    <>
      <div className="paste-header">
        {props.creatorEmail && (
          <p className="creator">
            By:&nbsp;
            <a href={`mailto:${props.creatorEmail}`} rel="noopener noreferrer" target="_blank">
              {props.creatorEmail}
            </a>
          </p>
        )}

        <Timestamps createdAt={props.createdAt} updatedAt={props.updatedAt} />
      </div>

      {props.files.map(file => (
        <ViewPasteFile key={file.id} {...file} />
      ))}

      <style jsx>
        {`
          .paste-header {
            display: flex;
            justify-content: space-between;
          }

          .creator {
            margin-bottom: 0;
          }
        `}
      </style>
    </>
  );
}


ViewPaste.propTypes = {
  creatorEmail: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  updatedAt: PropTypes.instanceOf(Date).isRequired,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    contents: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
  })),
};

ViewPaste.defaultProps = {
  creatorEmail: null,
  files: [],
};


export default ViewPaste;
