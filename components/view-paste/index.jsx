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
      <div>
        <p>
          By:&nbsp;
          <a href={`mailto:${creatorEmail}`} rel="noopener noreferrer" target="_blank">
            {creatorEmail}
          </a>
        </p>

        {/* <dl>
          <dt>Created At:</dt>
          <dd>{createdAt.toLocaleString()}</dd>
          <dt>Modified At:</dt>
          <dd>{updatedAt.toLocaleString()}</dd>
        </dl> */}
        <Timestamps createdAt={createdAt} updatedAt={updatedAt} />

      </div>
      {files.map(file => (
        <ViewPasteFile key={file.id} {...file} />
      ))}
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
