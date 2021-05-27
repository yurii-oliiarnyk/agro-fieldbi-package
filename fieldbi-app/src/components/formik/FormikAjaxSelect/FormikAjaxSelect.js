import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import AppAjaxSelect from '../../UI/AppAjaxSelect';

const FormikAjaxSelect = props => {
  const { onValueChange, name, ...restProps } = props;

  const { values, setFieldValue } = useFormikContext();
  const value = values[name];

  const handleChange = value => {
    onValueChange(value);
    setFieldValue(name, value);
  };

  return <AppAjaxSelect onValueChange={handleChange} value={value} {...restProps} />;
};

FormikAjaxSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func
};

FormikAjaxSelect.defaultProps = {
  onValueChange: () => {}
};

export default FormikAjaxSelect;
