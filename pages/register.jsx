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
  initialValues: { email: '', password: '', githubUrl: '' },

  validationSchema: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    githubUrl: yup.string().url().matches(/((https?:)?\/\/)?(www\.)?github\.com\/.+/i),
  }),

  async onSubmit(values) {
    return axios
      .post('/register', values)
      .then((res) => {
        console.log(res);
        return res;
      });
  },
};


export default function RegisterPage() {
  return (
    <Container>
      <h2>Register</h2>
      <Formik {...formConfig}>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => (
          <Form method="post" action="/register" onSubmit={handleSubmit} noValidate>
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
                {errors.password && (
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                )}
              </Form.Group>

            </Form.Row>
            <Form.Row>

              <Form.Group as={Col} md="6" controlId="githubUrl">
                <Form.Label>Github URL</Form.Label>
                <Form.Control
                  type="text"
                  name="githubUrl"
                  value={values.githubUrl}
                  disabled={isSubmitting}
                  isValid={touched.githubUrl && !errors.githubUrl}
                  isInvalid={errors.githubUrl}
                  onChange={handleChange}
                />
                {errors.githubUrl && (
                  <Form.Control.Feedback type="invalid">{errors.githubUrl}</Form.Control.Feedback>
                )}
              </Form.Group>

            </Form.Row>

            <Button type="submit">Register</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
