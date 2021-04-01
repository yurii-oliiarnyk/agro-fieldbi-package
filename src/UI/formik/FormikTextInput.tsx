import React from 'react';
import { Field } from 'formik';
import { TextInput, TextInputTypes } from '../TextInput';

type FormikTextInputTypes = {
  name: string;
  onChange?: (value: string) => void;
} & TextInputTypes;

export const FormikTextInput: React.FC<FormikTextInputTypes> = props => {
  const { name, onChangeText = () => null, ...restProps } = props;

  return (
    <Field name={name}>
      {({ field: { value }, form: { setFieldValue } }) => {
        const handleChange = value => {
          onChangeText(value);
          setFieldValue(name, value);
        };

        return <TextInput value={value} onChangeText={handleChange} {...restProps} />;
      }}
    </Field>
  );
};
export default FormikTextInput;
