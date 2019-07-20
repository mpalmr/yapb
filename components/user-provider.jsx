import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import client from '../client';


export const UserContext = createContext();


function UserProvider({ children, ...props }) {
  const [email, setEmail] = useState(props.email);


  async function login(loginEmail, password) {
    return client
      .post('/login', { password, email: loginEmail })
      .then((res) => {
        setEmail(loginEmail);
        localStorage.setItem('userEmail', loginEmail);
        Router.push('/');
        return res;
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


  const value = {
    email,
    login,
    logout,
    isLoggedIn: !!email,
  };


  return (
    <UserContext.Provider value={value}>
      {children}
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
