jest.mock('next/router', () => ({ push: jest.fn() }));
jest.mock('../../client', () => ({ post: jest.fn() }));

import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import Router from 'next/router';
import UserProvider, { UserContext } from '../user-provider';
import client from '../../client';


afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});


describe('login', () => {
  test('Throws an error if user is already logged in', async () => {
    const login = shallow((
      <UserProvider email="a@b.c">
        <Fragment />
      </UserProvider>
    ))
      .find(UserContext.Provider)
      .prop('value').login;

    return login('hacker@evil.org', 'P@ssw0rd').catch((error) => {
      expect(error.message).toEqual('User is already logged in.');
      expect(client.post).not.toHaveBeenCalled();
    });
  });


  test('Successful login', async () => {
    client.post.mockReturnValue(Promise.resolve('OK'));

    const wrapper = shallow((
      <UserProvider>
        <Fragment />
      </UserProvider>
    ));

    const login = wrapper.find(UserContext.Provider).prop('value').login;
    expect(wrapper.find(UserContext.Provider).prop('value').email).toBeNull();

    return login('hacker@evil.org', 'P@ssw0rd').then((res) => {
      expect(res).toEqual('OK');
      expect(localStorage.setItem).toHaveBeenCalledWith('userEmail', 'hacker@evil.org');
      expect(Router.push).toHaveBeenCalledWith('/');
      expect(wrapper.find(UserContext.Provider).prop('value').email).toEqual('hacker@evil.org');
    });
  });
});


describe('logout', () => {
  test('Throws an error if state contains an email', async () => {
    const logout = shallow((
      <UserProvider>
        <Fragment />
      </UserProvider>
    ))
      .find(UserContext.Provider)
      .prop('value').logout;

    return logout().catch((error) => {
      expect(error.message).toEqual('User is not logged in.');
      expect(localStorage.clear).not.toHaveBeenCalled();
      expect(client.post).not.toHaveBeenCalled();
    });
  });

  test('Successful logout', async () => {
    client.post.mockReturnValue(Promise.resolve('mockResponse'));

    const wrapper = shallow((
      <UserProvider email="a@b.c">
        <Fragment />
      </UserProvider>
    ));

    const logout = wrapper
      .find(UserContext.Provider)
      .prop('value').logout;

    return logout().then((res) => {
      expect(res).toEqual('mockResponse');
      expect(wrapper.find(UserContext.Provider).prop('value').email).toBeNull();
      expect(localStorage.clear).toHaveBeenCalled();
      expect(Router.push).toHaveBeenCalledWith('/');
    });
  });
});
