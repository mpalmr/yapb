import React from 'react';
import axios from 'axios';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';


const formConfig = {
  initialValues: { contents: '' },

  validate(values) {
    const errors = {};
    if (!values.contents.trim()) errors.contents = 'Required';
    return errors;
  },

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
