import React from 'react';
import { View } from 'react-native';
import { FormItem, FormItemTypes } from '../FormItem';
import { ErrorField } from '../error/ErrorField';

type FormikFormItemProps = {
  name: string;
} & FormItemTypes;

export const FormikFormItem: React.FC<FormikFormItemProps> = props => {
  const { name, ...restProps } = props;

  return (
    <View>
      <FormItem {...restProps} />
      <ErrorField name={name} />
    </View>
  );
};
