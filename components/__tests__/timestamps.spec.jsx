import React from 'react';
import { shallow } from 'enzyme';
import Timestamps from '../timestamps';


test('Displays times when available', () => {
  const wrapper = shallow(<Timestamps />);
  expect(wrapper.exists('.timestamp')).toEqual(false);

  wrapper.setProps({ createdAt: new Date('2000-01-01') });
  expect(wrapper.find('.timestamp')).toHaveLength(1);

  wrapper.setProps({ updatedAt: new Date('2000-01-01') });
  expect(wrapper.find('.timestamp')).toHaveLength(2);
});
