import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import AppSwitch from '../../UI/AppSwitch';

const FormikAppSwitch = props => {
  const { name } = props;

  const { values, setFieldValue } = useFormikContext();
  const value = values[name] ? values[name] : undefined;

  const handleChange = value => {
    if (value) {
      setFieldValue(name, value);
    } else {
      setFieldValue(name, null);
    }
  };

  return <AppSwitch value={value} onValueChange={handleChange} {...props} />;
};

FormikAppSwitch.propTypes = {
  name: PropTypes.string.isRequired
};

export default FormikAppSwitch;
