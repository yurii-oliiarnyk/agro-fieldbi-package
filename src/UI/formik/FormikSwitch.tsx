import React from 'react';
import { Field } from 'formik';
import { Switch } from '../Switch';

type FormikSwitchTypes = {
  name: string;
};

export const FormikSwitch: React.FC<FormikSwitchTypes> = props => {
  const { name } = props;

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        return (
          <Switch
            value={value}
            onValueChange={newValue => setFieldValue(name, newValue)}
            {...props}
          />
        );
      }}
    </Field>
  );
};
