import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

type TouchableFeedbackProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export const TouchableFeedback: React.FC<TouchableFeedbackProps> = (props): JSX.Element => {
  const { children, style, onPress, disabled } = props;

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={style} onPress={onPress} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};
