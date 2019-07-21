import React from 'react';
import PropTypes from 'prop-types';
import ViewPasteFile from './file';
import Timestamps from '../timestamps';


function ViewPaste({
  creatorEmail,
  createdAt,
  updatedAt,
  files,
}) {
  return (
    <>
      <div className="paste-header">
        {creatorEmail && (
          <p>
            By:&nbsp;
            <a href={`mailto:${creatorEmail}`} rel="noopener noreferrer" target="_blank">
              {creatorEmail}
            </a>
          </p>
        )}

        <Timestamps createdAt={createdAt} updatedAt={updatedAt} />
      </div>

      {files.map(file => (
        <ViewPasteFile key={file.id} {...file} />
      ))}

      <style jsx>
        {`
          .paste-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
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
