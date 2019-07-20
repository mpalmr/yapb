import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { Container, Form, Button } from 'react-bootstrap';
import { paste as validationSchema } from '../../validation-schemas';


const formConfig = {
  validationSchema,
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
    <Container>
      <Formik {...formConfig}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => (
          <Form method="post" action="/" onSubmit={handleSubmit} noValidate>

            <Form.Group controlId="contents">
              <Form.Control
                type="text"
                name="contents"
                value={values.contents}
                disabled={isSubmitting}
                isValid={touched.contents && !errors.contents}
                isInvalid={errors.contents}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit">Paste</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
