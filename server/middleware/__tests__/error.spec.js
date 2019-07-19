'use strict';

const errorMiddleware = require('../error');


beforeEach(() => {
  console.error = jest.fn();
});


test('Calls next with the error as a parameter only if res.headersSent is truthy', () => {
  const mockNext = jest.fn();

  errorMiddleware(
    new Error('mock error'),
    {},
    {
      headersSent: false,
      status: () => ({ json: jest.fn() }),
    },
    mockNext,
  );
  expect(mockNext).not.toBeCalled();

  const mockError = new Error('mock error');
  errorMiddleware(mockError, {}, { headersSent: true }, mockNext);
  expect(mockNext).toHaveBeenCalledWith(mockError);
});
