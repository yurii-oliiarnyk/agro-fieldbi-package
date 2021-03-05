import React from 'react';
import {
  StyleSheet,
  GestureResponderEvent,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { TouchableFeedback } from './TouchableFeedback';
import { COLORS } from '../colors';

type ButtonProps = {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'default' | 'outlined';
  full?: boolean;
  style?: ViewStyle;
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: COLORS.MAIN,
    borderWidth: 1,
    borderColor: COLORS.MAIN,
    borderStyle: 'solid',
    elevation: 1,
  },
  defaultText: {
    color: '#fff',
  },
  outlined: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.GREY,
    borderStyle: 'solid',
  },
  outlinedText: {
    borderColor: COLORS.GREY,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  full: {
    borderRadius: 0,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export const Button: React.FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
  const { children, onPress, disabled, loading, style, full, type } = props;

  const buttonStyle: ViewStyle[] = [styles.button];
  const textStyles: TextStyle[] = [styles.text];

  switch (type) {
    case 'outlined': {
      buttonStyle.push(styles.outlined);
      textStyles.push(styles.outlinedText);
      break;
    }

    case 'default':
    default: {
      buttonStyle.push(styles.default);
      textStyles.push(styles.defaultText);
      break;
    }
  }

  if (full) {
    buttonStyle.push(styles.full);
  }

  if (disabled) {
    buttonStyle.push(styles.disabled);
  }

  if (style) {
    buttonStyle.push(style);
  }

  return (
    <TouchableFeedback style={buttonStyle} onPress={!disabled ? onPress : undefined}>
      {loading && <ActivityIndicator size="small" color="#fff" style={styles.icon} />}
      <Text style={textStyles}>{children}</Text>
    </TouchableFeedback>
  );
};
