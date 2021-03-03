import React from 'react';
import { StyleSheet, GestureResponderEvent, Text, ActivityIndicator } from 'react-native';
import { TouchableFeedback } from './TouchableFeedback';
import { COLORS } from '../colors';

type ButtonProps = {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.MAIN,
    elevation: 1,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    marginRight: 8,
  },
});

export const Button: React.FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
  const { children, onPress, disabled, loading } = props;

  return (
    <TouchableFeedback
      style={[styles.button, disabled && styles.disabled]}
      onPress={!disabled ? onPress : undefined}
    >
      {loading && <ActivityIndicator size="small" color="#fff" style={styles.icon} />}
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableFeedback>
  );
};
