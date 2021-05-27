import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import AppRadioButtonGroup from '../../UI/AppRadioButtonGroup';

const FormikRadioButtonGroup = props => {
  const { name, onValueChange, ...restProps } = props;

  const { values, setFieldValue } = useFormikContext();
  const value = values[name];

  const onChangeHandler = value => {
    setFieldValue(name, value);
    onValueChange(value);
  };

  return <AppRadioButtonGroup onChangeHandler={onChangeHandler} active={value} {...restProps} />;
};

FormikRadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func
};

FormikRadioButtonGroup.defaultProps = {
  onValueChange: () => {}
};

export default FormikRadioButtonGroup;
