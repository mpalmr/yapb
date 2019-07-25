import React from 'react';
import PropTypes from 'prop-types';
import client from '../../client';


function UserPage({ email, ...xs }) {
  console.log(email, xs);
  return (
    <div />
  );
}


UserPage.propTypes = {
  email: PropTypes.string.isRequired,
};


UserPage.getInitialProps = async function ({ query, res }) {
  if (!process.browser) return res.locals.user;
  return client.get(`/user/${query.id}`);
};


export default UserPage;
