import React from 'react';
import { useFormikContext } from 'formik';
import { TextInput, TextInputTypes } from '../TextInput';

type FormikTextInputTypes = {
  name: string;
  onChange?: (value: string) => void;
} & TextInputTypes;

export const FormikTextInput: React.FC<FormikTextInputTypes> = props => {
  const { name, onChangeText = () => null, ...restProps } = props;

  const { setFieldValue } = useFormikContext();

  const handleChange = value => {
    onChangeText(value);

    if (value) {
      setFieldValue(name, value);
    } else {
      setFieldValue(name, undefined);
    }
  };

  return <TextInput onChangeText={handleChange} {...restProps} />;
};
export default FormikTextInput;
