import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import AppDatePicker from '../../UI/AppDatePicker';

const FormikDatePicker = props => {
  const { name, onValueChange, ...restProps } = props;

  const { values, setFieldValue } = useFormikContext();
  const value = values[name] ? values[name] : undefined;
  const filterDateFormat = 'YYYY-MM-DD HH:mm:ss';

  const handleChange = date => {
    onValueChange(date);

    if (date) {
      setFieldValue(
        name,
        moment(date)
          .startOf('day')
          .format(filterDateFormat)
      );
    } else {
      setFieldValue(name, null);
    }
  };

  return (
    <AppDatePicker onValueChange={handleChange} value={moment(value).toDate()} {...restProps} />
  );
};

FormikDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  onValueChange: PropTypes.func
};

FormikDatePicker.defaultProps = {
  onValueChange: () => {}
};

export default FormikDatePicker;
