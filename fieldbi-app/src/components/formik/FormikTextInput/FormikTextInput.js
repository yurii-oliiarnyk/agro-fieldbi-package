import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import AppTextInput from '../../UI/AppTextInput';

const FormikTextInput = props => {
  const { name, onChangeText, onBlur, ...restProps } = props;

  const { setFieldValue } = useFormikContext();

  const handleChange = value => {
    onChangeText(value);

    if (value) {
      setFieldValue(name, value);
    } else {
      setFieldValue(name, undefined);
    }
  };

  return <AppTextInput onChangeText={handleChange} {...restProps} />;
};

FormikTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func
};

FormikTextInput.defaultProps = {
  onChangeText: () => {},
  onBlur: () => {}
};

export default FormikTextInput;
