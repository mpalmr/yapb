import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import useFiles from '../use-files';


const exposeMock = jest.fn();

function Component() {
  const files = useFiles();
  exposeMock(files);
  return (
    <Fragment />
  );
}


beforeEach(() => {
  shallow(<Component />);
});

afterEach(() => {
  exposeMock.mockReset();
});

afterAll(() => {
  exposeMock.mockRestore();
});


test('addFile', () => {
  let call = exposeMock.mock.calls[0][0];
  expect(call.files).toHaveLength(1);

  call.addFile();
  call = exposeMock.mock.calls[1][0];
  expect(call.files).toHaveLength(2);
});


test('file values', () => {
  const file = exposeMock.mock.calls[0][0].files[0];
  expect(file.id)
    .toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  expect(file.name).toBe('');
  expect(file.contents).toBe('');
});


test('setters', () => {
  let file = exposeMock.mock.calls[0][0].files[0];
  expect(file.name).toBe('');
  expect(file.contents).toBe('');

  file.setName('billy bob thorton');
  file = exposeMock.mock.calls[1][0].files[0];
  expect(file.name).toBe('billy bob thorton');
  expect(file.contents).toBe('');

  file.setContents('i am a badass');
  file = exposeMock.mock.calls[2][0].files[0];
  expect(file.name).toBe('billy bob thorton');
  expect(file.contents).toBe('i am a badass');
});


test('remove', () => {
  let call = exposeMock.mock.calls[0][0];
  expect(call.files).toHaveLength(1);

  call.addFile();
  call = exposeMock.mock.calls[1][0];
  expect(call.files).toHaveLength(2);

  call.files[0].setName('joe rogan');
  call = exposeMock.mock.calls[2][0];
  expect(call.files).toHaveLength(2);
  expect(call.files[0].name).toBe('joe rogan');

  call.files[1].remove();
  call = exposeMock.mock.calls[3][0];
  expect(call.files).toHaveLength(1);
  expect(call.files[0].name).toBe('joe rogan');
});
