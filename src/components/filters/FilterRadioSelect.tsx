import React from 'react';
import i18n from 'i18n-js';
import { FormItem } from '../../UI/FormItem';
import { FormikRadioboxGroup } from '../../UI/formik/FormikRadioboxGroup';

type FilterRadioSelectTypes = {
  label: string;
  name: string;
};

export const FilterRadioSelect: React.FC<FilterRadioSelectTypes> = props => {
  const { label, name } = props;

  return (
    <FormItem label={label}>
      <FormikRadioboxGroup
        name={name}
        type="vertical"
        values={[
          {
            key: 'undefined',
            value: undefined,
            label: i18n.t('ui.radioSelect.all'),
          },
          {
            key: 'true',
            value: 'true',
            label: i18n.t('generals.yes'),
          },
          {
            key: 'false',
            value: 'false',
            label: i18n.t('generals.no'),
          },
        ]}
      />
    </FormItem>
  );
};
