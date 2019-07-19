'use strict';

module.exports = function validateRegistration(values) {
  const errors = {};

  if (!values.email.trim()) errors.email = 'Required';

  if (!values.password) errors.password = 'Required';
  else if (values.password.length < 6) {
    errors.password = 'Password must be at least six characters';
  }

  return errors;
};
