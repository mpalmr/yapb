import React from 'react';
import { shallow } from 'enzyme';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ViewPasteFile from '../file';


test('SyntaxHighlighter\'s language prop resolves to the correct name', () => {
  const wrapper = shallow(<ViewPasteFile name="a.js" contents="'use strict';" />);
  expect(wrapper.find(SyntaxHighlighter).prop('language')).toBe('javascript');

  wrapper.setProps({ name: 'a.rs' });
  expect(wrapper.find(SyntaxHighlighter).prop('language')).toBe('rust');
});
