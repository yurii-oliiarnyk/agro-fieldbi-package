import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

type TextProps = {
  children: string;
  style?: StyleProp<TextStyle>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 18,
  },
  h1: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
  },
});

export const Typography: React.FC<TextProps> & { H1: React.FC<TextProps> } = ({
  children,
  style,
}): JSX.Element => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

Typography.H1 = ({ children, style }): JSX.Element => {
  return <Text style={[styles.h1, style]}>{children}</Text>;
};
