import React from 'react';
import { Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';

type LinkProps = {
  children: string;
  onPress: (event: GestureResponderEvent) => void;
};

const styles = StyleSheet.create({
  link: {
    fontSize: 16,
    color: '#00a1ff',
  },
});

export const Link: React.FC<LinkProps> = (props: LinkProps): JSX.Element => {
  const { children, onPress } = props;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
};
