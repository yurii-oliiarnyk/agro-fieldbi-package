import React, { ReactNode, useContext } from 'react';
import { View, Text } from 'react-native';
import { ErrorContext } from './ErrorContext';

const getBackMessagesByFieldName = (error, name) => {
  const nameKeys = name
    .replace(/\[|]/gi, '.')
    .split('.')
    .filter(name => !!name);

  const getObjectByKey = (obj, key) => obj?.fields?.[key];

  const messages = nameKeys.reduce((acc, key) => {
    if (!acc) {
      return undefined;
    }

    return getObjectByKey(acc, key);
  }, error);

  return messages;
};

const getFieldBackendError = (errors, name) => {
  const backError = getBackMessagesByFieldName(errors, name);
  const hasBackendError = !!(backError && backError.messages);

  if (!hasBackendError) {
    return [false];
  }

  const [message] = backError.messages;

  return [true, message];
};

type ErrorFieldProps = {
  name: string;
  children?: (props: { message: string }) => ReactNode;
};

const defaultChildren = ({ message }) => (
  <View style={{ marginTop: 6 }}>
    <Text style={{ color: '#ffa39e' }}>{message}</Text>
  </View>
);

export const ErrorField: React.FC<ErrorFieldProps> = props => {
  const { name, children = defaultChildren } = props;

  const errors = useContext(ErrorContext);
  const [hasBackendError, backEndMessage] = getFieldBackendError(errors, name);

  if (hasBackendError) {
    return <>{children({ message: backEndMessage })}</>;
  }

  return null;
};
