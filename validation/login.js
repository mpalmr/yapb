'use strict';

module.exports = function validateRegistration(values) {
  const errors = {};
  if (!values.email.trim()) errors.email = 'Required';
  if (!values.password) errors.password = 'Required';
  return errors;
};
