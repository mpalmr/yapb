import React, { Fragment, useContext, useEffect } from 'react';
import Router from 'next/router';
import { UserContext } from '../components/user-provider';


export default function LogoutPage() {
  const { logout } = useContext(UserContext);

  useEffect(() => {
    logout().catch((error) => {
      if (error.message !== 'User is not logged in.') return Promise.reject(error);
      return Router.push('/');
    });
  });


  return (
    <Fragment />
  );
}
