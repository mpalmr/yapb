import React from 'react';
import axios from 'axios';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import validation from '../validation/registration';


const formConfig = {
  validation,
  initialValues: { email: '', password: '', githubUrl: '' },

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

          <Field name="githubUrl" />
          <ErrorMessage name="githubUrl" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
