import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import UserProvider, { UserContext } from '../user';


test('value prop', () => {
  const wrapper = shallow((
    <UserProvider>
      <Fragment />
    </UserProvider>
  ));
  expect(wrapper.find(UserContext.Provider).prop('value').email).toBe(null);
  expect(wrapper.find(UserContext.Provider).prop('value').isLoggedIn).toBe(false);

  wrapper.setProps({ email: 'hacker@evil.org' });
  expect(wrapper.find(UserContext.Provider).prop('value').email).toBe('hacker@evil.org');
  expect(wrapper.find(UserContext.Provider).prop('value').isLoggedIn).toBe(true);
});
