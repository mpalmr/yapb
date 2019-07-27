'use strict';

const authorize = require('../authorize');


const res = {
  sendStatus: jest.fn(),
  redirect: jest.fn(),
};
const next = jest.fn();

afterEach(() => {
  res.sendStatus.mockReset();
  res.redirect.mockReset();
  next.mockReset();
});


test('Call next when user is logged in', () => {
  const req = {
    session: { uid: 'mockUid' },
  };
  authorize(req, res, next);

  expect(next).toHaveBeenCalledWith();
  expect(res.sendStatus).not.toHaveBeenCalled();
  expect(res.redirect).not.toHaveBeenCalled();
});


test('Send 401 status code when route starts with /api/ and user is not logged in', () => {
  const req = {
    path: '/api/paste',
    session: {},
  };
  authorize(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.sendStatus).toHaveBeenCalledWith(401);
  expect(res.redirect).not.toHaveBeenCalled();
});


test('Redirect if user is not logged in for all other cases', () => {
  const req = {
    path: '/login',
    session: {},
  };
  authorize(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.sendStatus).not.toHaveBeenCalled();
  expect(res.redirect).toHaveBeenCalledWith('/');
});
