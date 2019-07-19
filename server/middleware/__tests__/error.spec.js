'use strict';

const errorMiddleware = require('../error');


const error = new Error('mock error');
const next = jest.fn();
const json = jest.fn();
const status = jest.fn();

beforeEach(() => {
  console.error = jest.fn();
  status.mockReturnValue({ json });
});

afterEach(() => {
  next.mockReset();
  json.mockReset();
  status.mockReset();
});


test('Call next if res.headersSent is truthy', () => {
  const res = { status, headersSent: true };
  errorMiddleware(error, {}, res, next);
  expect(status).not.toBeCalled();
  expect(json).not.toBeCalled();
  expect(next).toHaveBeenCalledWith(error);
});


test('Send a 500 response with the error as JSON if res.headersSent is falsey', () => {
  const res = { status, headersSent: false };
  errorMiddleware(error, {}, res, next);
  expect(next).not.toBeCalled();
  expect(status).toHaveBeenCalledWith(500);
  expect(json).toHaveBeenCalledWith(error);
});
