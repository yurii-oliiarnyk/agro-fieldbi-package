import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { COLORS } from 'agro-package';

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  background: {
    backgroundColor: COLORS.GREY_BG,
  },
});

type TableRowProps = {
  children: ReactNode;
  background: boolean;
  style?: StyleProp<ViewStyle>;
};

export const TableRow: React.FC<TableRowProps> = (props): JSX.Element => {
  const { children, background, style } = props;

  const stylesRow = [styles.row, style];

  if (background) {
    stylesRow.push(styles.background);
  }

  return <View style={stylesRow}>{children}</View>;
};
