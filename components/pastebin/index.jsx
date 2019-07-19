import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';


const formConfig = {
  initialValues: { contents: '' },

  validate(values) {
    const errors = {};
    if (!values.contents) errors.contents = 'Required';
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
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form method="post" action="/" onSubmit={handleSubmit}>
          <input
            type="text"
            name="contents"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email ? errors.email : null}

          <button type="submit" disabled={isSubmitting || !values.contents}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}
