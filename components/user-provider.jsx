import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import client from '../client';

const UserContext = createContext();


function UserProvider({ children, ...props }) {
  const [email, setEmail] = useState(props.email);


  async function login(loginEmail, password) {
    return client
      .post('/login', { password, email: loginEmail })
      .then((res) => {
        setEmail(loginEmail);
        localStorage.setItem('userEmail', loginEmail);
        return res;
      });
  }


  async function logout() {
    if (!email) throw new Error('User is not logged in.');
    setEmail(null);
    localStorage.clear();
    return client.post('/logout');
  }


  return (
    <UserContext.Provider value={{ email, login, logout }}>
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
