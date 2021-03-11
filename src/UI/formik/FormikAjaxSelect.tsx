import React from 'react';
import { useFormikContext } from 'formik';
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

  const { values, setFieldValue } = useFormikContext();
  const value = values[name];

  const handleChange = (newValue: ValueType): void => {
    onChange(newValue);
    setFieldValue(name, newValue);
  };

  return <AjaxSelect onValueChange={handleChange} value={value} {...restProps} />;
};
