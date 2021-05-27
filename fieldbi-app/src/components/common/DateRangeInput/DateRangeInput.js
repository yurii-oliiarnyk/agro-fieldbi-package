import React from 'react';
import moment from 'moment';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import FormItem from '../../UI/FormItem';
import AppDatePicker from '../../UI/AppDatePicker';

const DateRangeInput = props => {
  const { label, name } = props;

  const { values, setFieldValue } = useFormikContext();
  const { from, to } = values[name] || { from: null, to: null };
  const filterDateFormat = 'YYYY-MM-DD HH:mm:ss';

  const nameFrom = `${name}.from`;
  const nameTo = `${name}.to`;

  const changeHandler = date => {
    if (date) {
      setFieldValue(
        nameFrom,
        moment(date)
          .startOf('day')
          .format(filterDateFormat)
      );
    } else {
      setFieldValue(nameFrom, null);
    }
  };

  const changeFromHandler = date => {
    if (date) {
      setFieldValue(
        nameTo,
        moment(date)
          .endOf('day')
          .format(filterDateFormat)
      );
    } else {
      setFieldValue(nameTo, null);
    }
  };

  return (
    <FormItem label={label}>
      <AppDatePicker
        onValueChange={changeHandler}
        placeholder={i18n.t('ui.filter.from')}
        value={from && moment(from).toDate()}
        maximumDate={to ? moment(to).toDate() : null}
      />
      <AppDatePicker
        onValueChange={changeFromHandler}
        placeholder={i18n.t('ui.filter.to')}
        value={to && moment(to).toDate()}
        minimumDate={from ? moment(from).toDate() : null}
      />
    </FormItem>
  );
};

DateRangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default DateRangeInput;
