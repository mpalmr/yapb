'use strict';

const authorizeMiddleware = require('../authorize');


const res = { redirect: jest.fn() };
const next = jest.fn();

afterEach(() => {
  res.redirect.mockReset();
  next.mockReset();
});

afterAll(() => {
  res.redirect.mockRestore();
  next.mockRestore();
});


test('Redirects with a 401 status code when the user is not logged in', () => {
  authorizeMiddleware({ session: {} }, res, next);
  expect(res.redirect).toHaveBeenCalledWith(401, '/');
  expect(next).not.toHaveBeenCalled();
});


test('Calls next if user is logged in', () => {
  const req = {
    session: { uid: 'mockUid' },
  };
  authorizeMiddleware(req, res, next);
  expect(res.redirect).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith();
});
