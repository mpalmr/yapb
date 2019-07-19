'use strict';

module.exports = function validateRegistration(values) {
  const errors = {};

  if (!values.email.trim()) errors.email = 'Required';

  if (!values.password) errors.password = 'Required';
  else if (values.password.length < 6) {
    errors.password = 'Password must be at least six characters';
  }

  if (values.githubUrl && !/((https?:)?\/\/)?(www\.)?github\.com\/.+/i.test(values.githubUrl)) {
    errors.githubUrl = 'URL must be for for github.com';
  }

  return errors;
};
