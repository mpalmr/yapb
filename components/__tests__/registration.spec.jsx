import React from 'react';
import { shallow } from 'enzyme';
import Registration from '../registration';


describe('Validation', () => {
  test('Email', () => {
    const wrapper = shallow(<Registration />);
    wrapper.find('Form').simulate('submit');
    console.log(wrapper.find('ErrorMessage[name="email"]').props());
    expect(true).toBe(false);
  });
});
