import React from 'react';
import { FormItem, FormItemTypes } from '../FormItem';
import { ErrorField } from '../error/ErrorField';

type FormikFormItemProps = {
  name: string;
} & FormItemTypes;

export const FormikFormItem: React.FC<FormikFormItemProps> = props => {
  const { name, children, ...restProps } = props;

  return (
    <FormItem {...restProps}>
      {children}
      <ErrorField name={name} />
    </FormItem>
  );
};
