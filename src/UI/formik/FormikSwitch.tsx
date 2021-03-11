import React from 'react';
import { useFormikContext } from 'formik';
import { Switch } from '../Switch';

type FormikSwitchTypes = {
  name: string;
};

export const FormikSwitch: React.FC<FormikSwitchTypes> = props => {
  const { name } = props;

  const { values, setFieldValue } = useFormikContext();

  const handleChange = (newValue: boolean) => {
    if (newValue) {
      setFieldValue(name, newValue);
    } else {
      setFieldValue(name, null);
    }
  };

  return <Switch value={values[name]} onValueChange={handleChange} {...props} />;
};
