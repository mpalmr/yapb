import React from 'react';
import PropTypes from 'prop-types';


function ErrorPage(props) {
  return (
    <>
      <h1>An error has occured</h1>
      <p>{props.message}</p>

      <style jsx global>
        {`
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}


ErrorPage.propTypes = {
  message: PropTypes.string,
};

ErrorPage.defaultProps = {
  message: 'unknown',
};


const messages = {
  404: 'resource not found',
};

ErrorPage.getInitialProps = function ({ res, err }) {
  console.error(err);
  const statusCode = process.browser ? null : res.statusCode;
  return {
    message: messages[statusCode],
  };
};


export default ErrorPage;
