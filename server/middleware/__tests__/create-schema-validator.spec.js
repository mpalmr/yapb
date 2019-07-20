'use strict';

const yup = require('yup');
const createSchemaValidator = require('../create-schema-validator');


const next = jest.fn();
const json = jest.fn();
const status = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  status.mockReturnValue({ json });
});


test('Calls next and returns result if valid', async () => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });

  const schemaValidatorMiddleware = createSchemaValidator(schema);
  const req = {
    body: { email: 'mspalmer91@gmail.com', password: 'P@ssw0rd' },
  };

  return schemaValidatorMiddleware(req, { status }, next).then((result) => {
    expect(result).toEqual({ email: 'mspalmer91@gmail.com', password: 'P@ssw0rd' });
    expect(status).not.toHaveBeenCalled();
    expect(json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});


test('Sends a 400 response if invalid', async () => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });

  const schemaValidatorMiddleware = createSchemaValidator(schema);
  const req = {
    body: { email: 'mspalmer91@gmail.com', password: 'P@s' },
  };

  return schemaValidatorMiddleware(req, { status }, next).catch((result) => {
    expect(result.message).toEqual('password must be at least 6 characters');
    expect(next).not.toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalled();
  });
});
