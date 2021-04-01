import React from 'react';
import { Field } from 'formik';
import { Select, OptionType } from '../Select';

type FormikSelectProps = {
  name: string;
  onValueChange?: (value: any) => void;
  options: OptionType[];
  placeholder: string;
  emptyLabel?: string;
  loadingLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  transformedOptionsHandler?: (options: OptionType[]) => OptionType[];
};

export const FormikSelect: React.FC<FormikSelectProps> = props => {
  const { name, onValueChange, ...restProps } = props;

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        const handleChange = value => {
          onValueChange(value);
          setFieldValue(name, value);
        };

        return <Select value={value} onValueChange={handleChange} {...restProps} />;
      }}
    </Field>
  );
};
