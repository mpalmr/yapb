import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-bootstrap';
import NotificationsProvider, { NotificationsContext } from '../notifications';


test('dispatchNotification', () => {
  const wrapper = shallow((
    <NotificationsProvider>
      <Fragment />
    </NotificationsProvider>
  ));

  const dispatchNotification = wrapper
    .find(NotificationsContext.Provider)
    .prop('value');

  expect(wrapper.exists(Alert)).toEqual(false);

  dispatchNotification('error', 'test message', 10);
  expect(wrapper.find(Alert)).toHaveLength(1);

  setTimeout(() => {
    expect(wrapper.exists(Alert)).toEqual(false);
  }, 15);
});
