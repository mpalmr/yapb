import React from 'react';
import axios from 'axios';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import validation from '../validation/login';


const formConfig = {
  validation,
  initialValues: { email: '', password: '' },

  async onSubmit(values) {
    return axios
      .post('/login', values)
      .then((res) => {
        console.log(res);
        return res;
      });
  },
};


export default function Login() {
  return (
    <Formik {...formConfig}>
      {({ isSubmitting }) => (
        <Form method="post" action="/login">
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" />

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