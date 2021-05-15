import React from 'react';
import { Text, StyleSheet, View, StyleProp, TextStyle, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  column: {
    paddingHorizontal: 8,
  },
});

type TableColProps = {
  children: any;
  columnStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const TableCol: React.FC<TableColProps> = (props): JSX.Element => {
  const { children, columnStyle, textStyle } = props;

  if (typeof children === 'object') {
    return <View style={[styles.column, columnStyle]}>{children}</View>;
  }

  return (
    <View style={[styles.column, columnStyle]}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};
