import React from 'react';
import i18n from 'i18n-js';
import { useFormikContext } from 'formik';

import { FormItem } from '../../UI/FormItem';
import { FormikTextInput } from '../../UI/formik/FormikTextInput';
import { TextInputTypes } from '../../UI/TextInput';

type FilterRangeInputTypes = {
  label: string;
  name: string;
} & TextInputTypes;

export const FilterRangeInput: React.FC<FilterRangeInputTypes> = props => {
  const { label, name } = props;

  const { values } = useFormikContext();
  const value = values[name];
  const { from, to } = value || { from: null, to: null };

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
