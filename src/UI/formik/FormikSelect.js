import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import AppSelect from '../../UI/AppSelect';

const FormikSelect = props => {
  const { name, onValueChange, ...restProps } = props;

  const { values, setFieldValue } = useFormikContext();
  const value = values[name];

  const handleChange = value => {
    onValueChange(value);
    setFieldValue(name, value);
  };

  return <AppSelect value={value} onValueChange={handleChange} {...restProps} />;
};

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func
};

FormikSelect.defaultProps = {
  onValueChange: () => {}
};

export default FormikSelect;
