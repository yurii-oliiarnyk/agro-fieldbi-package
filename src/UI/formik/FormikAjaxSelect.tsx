import React from 'react';
import { Field } from 'formik';
import { AjaxSelect } from '../AjaxSelect';
import { ValueType, OptionType } from '../Select';

type FormikAjaxSelectType = {
  apiUrl: string;
  name: string;
  placeholder: string;
  onChange?: (value: ValueType) => void;
  emptyLabel?: string;
  loadingLabel?: string;
  transformedOptionsHandler?: (options: OptionType[]) => OptionType[];
};

export const FormikAjaxSelect: React.FC<FormikAjaxSelectType> = props => {
  const { onChange = () => null, name, ...restProps } = props;

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        const handleChange = (newValue: ValueType): void => {
          onChange(newValue);
          setFieldValue(name, newValue);
        };

        return <AjaxSelect onValueChange={handleChange} value={value} {...restProps} />;
      }}
    </Field>
  );
};
