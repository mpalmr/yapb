import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  Container,
  Form,
  Button,
  Col,
} from 'react-bootstrap';


const formConfig = {
  initialValues: { email: '', password: '' },

  validationSchema: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  }),

  async onSubmit(values) {
    return axios
      .post('/login', values)
      .then((res) => {
        console.log(res);
        return res;
      });
  },
};


export default function LoginPage() {
  return (
    <Container>
      <h2>Login</h2>
      <Formik {...formConfig}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => (
          <Form method="post" action="/login" onSubmit={handleSubmit} noValidate>
            <Form.Row>

              <Form.Group as={Col} md="6" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  disabled={isSubmitting}
                  isValid={touched.email && !errors.email}
                  isInvalid={errors.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  disabled={isSubmitting}
                  isValid={touched.password && !errors.password}
                  isInvalid={errors.password}
                  onChange={handleChange}
                />
                {errors.email && (
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                )}
              </Form.Group>

            </Form.Row>

            <Button type="submit">Login</Button>

          </Form>
        )}
      </Formik>
    </Container>
  );
}
