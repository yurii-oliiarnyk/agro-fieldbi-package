import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import FormikRadioButtonGroup from '../../formik/FormikRadioButtonGroup';
import FormItem from '../../UI/FormItem';

const FilterRadioSelect = props => {
  const { label, name } = props;

  return (
    <FormItem label={label}>
      <FormikRadioButtonGroup
        name={name}
        type="vertical"
        values={[
          {
            key: 'undefined',
            value: undefined,
            label: i18n.t('ui.radioSelect.all')
          },
          {
            key: 'true',
            value: true,
            label: i18n.t('generals.yes')
          },
          {
            key: 'false',
            value: false,
            label: i18n.t('generals.no')
          }
        ]}
      />
    </FormItem>
  );
};

FilterRadioSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default FilterRadioSelect;
