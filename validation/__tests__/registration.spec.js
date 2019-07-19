'use strict';

const validate = require('../registration');


let initialValues;
beforeEach(() => {
  initialValues = { email: '', password: '' };
});


test('Email', () => {
  expect(validate({ ...initialValues }).email).toEqual('Required');
  expect(validate({ ...initialValues, email: '  ' }).email).toEqual('Required');
  expect(validate({ ...initialValues, email: 'hacker@evil.org' }).email).toBeUndefined();
});


test('Password', () => {
  expect(validate({ ...initialValues }).password).toEqual('Required');
  expect(validate({ ...initialValues, password: 'abc' }).password)
    .toEqual('Password must be at least six characters');
  expect(validate({ ...initialValues, password: 'P@ssw0rd' }).password).toBeUndefined();
});
