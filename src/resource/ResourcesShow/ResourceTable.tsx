import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../colors';

const styles = StyleSheet.create({
  table: {
    paddingVertical: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  background: {
    backgroundColor: COLORS.GREY_BG,
  },
  column: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 16,
    flexShrink: 1,
  },
  name: {
    color: COLORS.GREY,
  },
  value: {
    color: COLORS.BLACK,
    textAlign: 'right',
  },
  link: {
    color: COLORS.MAIN,
  },
  note: {
    marginTop: 6,
  },
});

type ResourceTableProps = {
  data: Array<{
    key: string;
    name: string;
    value: string | number | ReactNode;
    html?: boolean;
    render?: (
      value: any,
      styles: { textStyle: TextStyle; linkStyle: TextStyle }
    ) => ReactNode | string | number;
    note?: ReactNode | string;
  }>;
  style: StyleProp<ViewStyle>;
};

export const ResourceTable: React.FC<ResourceTableProps> = props => {
  const { data, style } = props;

  return (
    <View style={[styles.table, style]}>
      {data
        .filter(row => row.value)
        .map((row, index) => {
          let { value } = row;
          const { render, note } = row;

          const rowStyle = [styles.row];
          const hasBackground = index % 2;

          if (row.html) {
            const regex = /(<([^>]+)>)/gi;
            value = String(value).replace(regex, '');
          }

          const name = `${row.name}:`;

          if (render) {
            value = render(value, {
              textStyle: { ...styles.text, ...styles.value },
              linkStyle: styles.link,
            });
          } else {
            value = <Text style={[styles.text, styles.value]}>{value}</Text>;
          }

          return (
            <View key={row.key} style={hasBackground && styles.background}>
              <View style={rowStyle}>
                <View style={styles.column}>
                  <Text style={[styles.text, styles.name]}>{name}</Text>
                </View>
                <View style={styles.column}>{value}</View>
                {note && <View style={styles.note}>{note}</View>}
              </View>
            </View>
          );
        })}
    </View>
  );
};
