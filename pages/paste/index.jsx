import React from 'react';
import client from '../../client';


function CurrentUserPastes(props) {
  console.log(props);
  return (
    <p>Pastes</p>
  );
}


CurrentUserPastes.getInitialProps = async function ({ res }) {
  return process.browser ? client.get('/paste') : { pastes: res.locals.pastes };
};


export default CurrentUserPastes;
