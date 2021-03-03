import React from 'react';
import { View, ActivityIndicator, StyleSheet, ActivityIndicatorProps } from 'react-native';
import { COLORS } from '../colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Loader: React.FC<ActivityIndicatorProps> = (props): JSX.Element => {
  const { size = 'large', color = COLORS.MAIN, ...restProps } = props;

  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size={size} color={color} {...restProps} />
    </View>
  );
};
