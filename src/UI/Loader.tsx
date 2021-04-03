import React, { ReactNode } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ActivityIndicatorProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../colors';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipWrapper: {
    marginTop: 4,
  },
  tip: {
    fontSize: 16,
  },
});

type LoaderProps = {
  wrapperStyle?: StyleProp<ViewStyle>;
  tip?: string | ReactNode;
} & ActivityIndicatorProps;

export const Loader: React.FC<LoaderProps> = (props): JSX.Element => {
  const { size = 'large', color = COLORS.MAIN, tip, wrapperStyle, ...restProps } = props;

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <ActivityIndicator size={size} color={color} {...restProps} />
      {tip && (
        <View style={styles.tipWrapper}>
          <Text style={styles.tip}>{tip}</Text>
        </View>
      )}
    </View>
  );
};
