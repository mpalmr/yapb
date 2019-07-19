import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';
import Registration from '../registration';


describe('Validation', () => {
  let validate;
  let initialValues;

  beforeEach(() => {
    const formikProps = shallow(<Registration />)
      .find(Formik)
      .props();
    validate = formikProps.validate;
    initialValues = formikProps.initialValues;
  });


  test('Email', () => {
    expect(validate({ ...initialValues }).email)
      .toEqual('Required');

    expect(validate({ ...initialValues, email: 'hacker@evil.org' }).email)
      .toBeUndefined();
  });


  test('Password', () => {
    expect(validate({ ...initialValues }).password)
      .toEqual('Required');

    expect(validate({ ...initialValues, password: 'asdf' }).password)
      .toEqual('Password must be at least six characters');

    expect(validate({ ...initialValues, password: 'P@ssw0rd' }).password)
      .toBeUndefined();
  });
});
