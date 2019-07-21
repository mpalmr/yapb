'use strict';

const yup = require('yup');


module.exports = {
  paste: yup.array().of(yup.object().shape({
    name: yup.string().max(260),
    contents: yup.string().required(),
  })),

  login: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  }),

  register: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    githubUrl: yup
      .string()
      .url()
      .matches(/((https?:)?\/\/)?(www\.)?github\.com\/.+/i, { excludeEmptyString: true }),
  }),
};
