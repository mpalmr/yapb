'use strict';

module.exports = function validatePaste(values) {
  const errors = {};

  if (!values.contents.trim()) errors.contents = 'Required';

  return errors;
};
