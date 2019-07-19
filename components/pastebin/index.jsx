import React from 'react';
import axios from 'axios';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import validate from '../../validation/paste';


const formConfig = {
  validate,
  initialValues: { contents: '' },

  async onSubmit(values) {
    return axios
      .post('/', values)
      .then((res) => {
        console.log(res);
        return res;
      });
  },
};


export default function Pastebin() {
  return (
    <Formik {...formConfig}>
      {({ isSubmitting }) => (
        <Form method="post" action="/">
          <Field name="contents" />
          <ErrorMessage name="contents" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
