'use strict';

const validate = require('../registration');


let vals;
beforeEach(() => {
  vals = { email: '', password: '' };
});


test('Email', () => {
  expect(validate({ ...vals }).email).toEqual('Required');
  expect(validate({ ...vals, email: '  ' }).email).toEqual('Required');
  expect(validate({ ...vals, email: 'hacker@evil.org' }).email).toBeUndefined();
});


test('Password', () => {
  expect(validate({ ...vals }).password).toEqual('Required');
  expect(validate({ ...vals, password: 'abc' }).password)
    .toEqual('Password must be at least six characters');
  expect(validate({ ...vals, password: 'P@ssw0rd' }).password).toBeUndefined();
});


test('GitHub URL', () => {
  expect(validate({ ...vals }).githubUrl).toBeUndefined();

  const errMsg = 'URL must be for for github.com';
  expect(validate({ ...vals, githubUrl: 'google.ca/coolcat' }).githubUrl).toEqual(errMsg);
  expect(validate({ ...vals, githubUrl: 'github/coolcat' }).githubUrl).toEqual(errMsg);
  expect(validate({ ...vals, githubUrl: '/coolcat' }).githubUrl).toEqual(errMsg);
  expect(validate({ ...vals, githubUrl: 'github.com' }).githubUrl).toEqual(errMsg);

  expect(validate({ ...vals, githubUrl: 'github.com/a' }).githubUrl).toBeUndefined();
  expect(validate({ ...vals, githubUrl: 'www.github.com/a' }).githubUrl).toBeUndefined();
  expect(validate({ ...vals, githubUrl: 'https://www.github.com/a' }).githubUrl).toBeUndefined();
  expect(validate({ ...vals, githubUrl: 'http://www.github.com/a' }).githubUrl).toBeUndefined();
  expect(validate({ ...vals, githubUrl: 'https://github.com/a' }).githubUrl).toBeUndefined();

  expect(validate({ ...vals, githubUrl: 'https://github.com/mpalmr' }).githubUrl).toBeUndefined();
});
