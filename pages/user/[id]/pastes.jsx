import React from 'react';
import PropTypes from 'prop-types';
import { pasteProp } from '../../../prop-types';
import client from '../../../client';


function UserPastes(props) {
  console.log(props);

  return (
    <p>User Pastes</p>
  );
}


UserPastes.propTypes = {
  userId: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  pastes: PropTypes.arrayOf(pasteProp).isRequired,
};


UserPastes.getInitialProps = async function ({ query, res }) {
  return process.browser ? client.get(`/user/${query.id}/pastes`) : res.locals;
};


export default UserPastes;
