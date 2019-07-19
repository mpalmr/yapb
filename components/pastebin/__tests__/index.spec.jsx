import React from 'react';
import { shallow } from 'enzyme';
import { Formik } from 'formik';
import Pastebin from '..';


describe('Validation', () => {
  let validate;
  let initialValues;
  beforeEach(() => {
    const formikProps = shallow(<Pastebin />)
      .find(Formik)
      .props();
    validate = formikProps.validate;
    initialValues = formikProps.initialValues;
  });


  test('contents', () => {
    expect(validate({ ...initialValues }).contents)
      .toEqual('Required');

    expect(validate({ ...initialValues, contents: 'a' }).contents)
      .toBeUndefined();
  });
});
