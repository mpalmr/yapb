import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import { Alert } from 'react-bootstrap';
import NotificationsProvider, { NotificationsContext } from '../notifications';


describe('dispatchNotification', () => {
  test('Can be dispatched and closed on a timeout', async () => {
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

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(wrapper.exists(Alert)).toEqual(false);
        resolve();
      }, 15);
    });
  });


  test('Can be dismissed through onClose prop', () => {
    const wrapper = shallow((
      <NotificationsProvider>
        <Fragment />
      </NotificationsProvider>
    ));

    const dispatchNotification = wrapper
      .find(NotificationsContext.Provider)
      .prop('value');

    expect(wrapper.exists(Alert)).toEqual(false);

    dispatchNotification('error', 'other test');
    expect(wrapper.find(Alert)).toHaveLength(1);

    wrapper.find(Alert).first().prop('onClose')();
    expect(wrapper.exists(Alert)).toEqual(false);
  });
});
