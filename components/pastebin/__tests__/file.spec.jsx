import React from 'react';
import { shallow } from 'enzyme';
import { Form, Button } from 'react-bootstrap';
import PastebinFile from '../file';


const remove = jest.fn();
const setName = jest.fn();
const setContents = jest.fn();

afterEach(() => {
  remove.mockReset();
  setName.mockReset();
  setContents.mockReset();
});


function createDefaultProps() {
  return {
    remove,
    setName,
    setContents,
    name: 'code.js',
    contents: 'const a = 5;',
    canRemove: true,
  };
}


test('Name input', () => {
  const wrapper = shallow(<PastebinFile {...createDefaultProps()} />);
  expect(wrapper.find(Form.Control).prop('value')).toEqual('code.js');

  wrapper.find(Form.Control).simulate('change', {
    target: { value: 'changed.ts' },
  });
  expect(setName).toHaveBeenCalledWith('changed.ts');
});


test('Remove button', () => {
  const wrapper = shallow(<PastebinFile {...createDefaultProps()} canRemove={false} />);
  expect(wrapper.exists(Button)).toBe(false);

  wrapper.setProps({ canRemove: true });
  expect(wrapper.exists(Button)).toBe(true);

  wrapper.find(Button).simulate('click', 'mock remove');
  expect(remove).toHaveBeenCalledWith('mock remove');
});
