import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import FormItem from '../../UI/FormItem';
import FormikTextInput from '../../formik/FormikTextInput';

const FilterRangeInput = props => {
  const { label, name, formik } = props;

  const { values } = formik;
  const { from, to } = values[name] || { from: null, to: null };

  return (
    <>
      <FormItem label={label}>
        <FormikTextInput
          name={`${name}.from`}
          placeholder={i18n.t('ui.filter.from')}
          value={from}
          keyboardType="decimal-pad"
        />
        <FormikTextInput
          name={`${name}.to`}
          placeholder={i18n.t('ui.filter.to')}
          value={to}
          keyboardType="decimal-pad"
        />
      </FormItem>
    </>
  );
};

FilterRangeInput.defaultProps = {
  max: Infinity
};

FilterRangeInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  max: PropTypes.number
};

export default connect(FilterRangeInput);
