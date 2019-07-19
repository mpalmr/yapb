import React from 'react';
import axios from 'axios';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';


const formConfig = {
  initialValues: { email: '', password: '' },

  validate(values) {
    const errors = {};

    if (!values.email) errors.email = 'Required';

    if (!values.password) errors.password = 'Required';
    else if (values.password.length < 6) {
      errors.password = 'Password must be at least six characters.';
    }

    return errors;
  },

  async onSubmit(values) {
    return axios
      .post('/register', values)
      .then((res) => {
        console.log(res);
        return res;
      });
  },
};


export default function Register() {
  return (
    <Formik {...formConfig}>
      {({ isSubmitting }) => (
        <Form method="post" action="/register">
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="dev" />

          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
