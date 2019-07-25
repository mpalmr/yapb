import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { NotificationsContext } from './notifications';
import client from '../../client';


export const UserContext = createContext();


function UserProvider(props) {
  const dispatchNotification = useContext(NotificationsContext);
  const [email, setEmail] = useState(props.email);


  async function login(loginEmail, password) {
    if (email) {
      dispatchNotification('warning', 'User is already logged in.');
      throw new Error('User is already logged in.');
    }

    return client
      .post('/login', { password, email: loginEmail })
      .then((res) => {
        setEmail(loginEmail);
        Router.push('/');
        dispatchNotification('success', 'Login successful!');
        return res;
      })
      .catch(() => {
        dispatchNotification('error', 'Authorization failed.');
      });
  }


  async function logout() {
    if (!email) {
      dispatchNotification('warning', 'User is not logged in.');
      throw new Error('User is not logged in.');
    }
    setEmail(null);

    return client
      .post('/logout')
      .then((res) => {
        Router.push('/');
        return res;
      });
  }


  return (
    <UserContext.Provider
      value={{
        email,
        login,
        logout,
        isLoggedIn: !!email,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}


UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  email: PropTypes.string,
};

UserProvider.defaultProps = {
  email: null,
};


export default UserProvider;
