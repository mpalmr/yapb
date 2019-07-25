import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { NotificationsContext } from './notifications';
import client from '../../client';


export const UserContext = createContext();


function UserProvider({ children, ...props }) {
  const dispatchNotification = useContext(NotificationsContext);
  const [id, setId] = useState(props.id);
  const [email, setEmail] = useState(props.email);


  async function login(loginEmail, password) {
    if (email) throw new Error('User is already logged in.');

    return client
      .post('/login', { password, email: loginEmail })
      .then((res) => {
        setId(res.id);
        setEmail(loginEmail);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('userEmail', loginEmail);
        Router.push('/');
        dispatchNotification('success', 'Login successful!');
        return res;
      })
      .catch(() => {
        dispatchNotification('error', 'Authorization failed.');
      });
  }


  async function logout() {
    if (!email) throw new Error('User is not logged in.');
    setEmail(null);
    localStorage.clear();

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
        id,
        email,
        login,
        logout,
        isLoggedIn: !!email,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}


UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  email: PropTypes.string,
};

UserProvider.defaultProps = {
  id: null,
  email: null,
};


export default UserProvider;
