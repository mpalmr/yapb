'use strict';

const createValidatorHandler = require('../create-validator-middleware');


const next = jest.fn();
const json = jest.fn();
const status = jest.fn().mockReturnValue({ json });

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});


test('Invalid', () => {
  const errors = { a: 'foo', b: 'bar', c: 'baz' };
  const validate = createValidatorHandler(() => errors);
  expect(validate({}, { status }, next)).toBeUndefined();
  expect(next).not.toHaveBeenCalled();
  expect(status).toHaveBeenCalledWith(400);
  expect(json).toHaveBeenCalledWith({ errors });
});


test('Valid', () => {
  const validate = createValidatorHandler(() => ({}));
  expect(validate({}, { status }, next)).toBeUndefined();
  expect(status).not.toHaveBeenCalled();
  expect(json).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith();
});
