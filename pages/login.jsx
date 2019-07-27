import React, { useContext } from 'react';
import { Formik } from 'formik';
import {
  Container,
  Form,
  Button,
  Col,
} from 'react-bootstrap';
import { UserContext } from '../components/providers/user';
import { login as validationSchema } from '../validation-schemas';


function LoginPage() {
  const { login } = useContext(UserContext);


  async function onSubmit(values, { setSubmitting }) {
    return login(values.email, values.password).finally(() => {
      setSubmitting(false);
    });
  }


  return (
    <Container>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
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


export default LoginPage;
