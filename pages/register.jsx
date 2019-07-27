import React, { useContext } from 'react';
import Router from 'next/router';
import { Formik } from 'formik';
import {
  Container,
  Form,
  Button,
  Col,
} from 'react-bootstrap';
import { NotificationsContext } from '../components/providers/notifications';
import client from '../client';
import { register as schema } from '../validation-schemas';


function RegisterPage() {
  const dispatchNotification = useContext(NotificationsContext);


  async function onSubmit(values, { setSubmitting }) {
    return client
      .post('/register', values)
      .then((res) => {
        Router.push('/login');
        return res;
      })
      .catch((error) => {
        dispatchNotification('error', error.response.data.displayError || 'Unknown error.');
        return Promise.reject(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }


  return (
    <Container>
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '', githubUrl: '' }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
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


export default RegisterPage;
