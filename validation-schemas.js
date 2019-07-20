'use strict';

const yup = require('yup');


module.exports = {
  paste: yup.object().shape({
    contents: yup.string().required(),
  }),

  login: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  }),

  register: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    githubUrl: yup.string().url().matches(/((https?:)?\/\/)?(www\.)?github\.com\/.+/i),
  }),
};
