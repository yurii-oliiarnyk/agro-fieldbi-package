import React from 'react';
import { useFormikContext } from 'formik';
import { RadioboxGroup } from '../RadioboxGroup';

type FormikRadioboxGroupTypes = {
  name: string;
  onChange?: (value: string) => void;
  values: Array<{
    key: string;
    label: string;
    value?: string;
  }>;
  active?: string;
  type?: 'vertical' | 'horizontal';
};

export const FormikRadioboxGroup: React.FC<FormikRadioboxGroupTypes> = props => {
  const { name, onChange = () => null, ...restProps } = props;

  const { values, setFieldValue } = useFormikContext();
  const value = values[name];

  const onChangeHandler = value => {
    onChange(value);
    setFieldValue(name, value);
  };

  return <RadioboxGroup onChange={onChangeHandler} active={value} {...restProps} />;
};
