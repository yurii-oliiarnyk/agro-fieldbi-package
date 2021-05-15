import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { TableRow } from './TableRow';
import { TableCol } from './TableCol';

type TableProps<DataObject> = {
  nameColumnWidth: number;
  valueColumnWidth: number;
  dataSource: DataObject[];
  scrollable?: boolean;
  rows: Array<{
    key: string;
    dataIndex: keyof DataObject;
    name?: string;
    render?: (value: any, data: DataObject, index: number) => any;
    textStyle?: StyleProp<TextStyle>;
    rowStyle?: StyleProp<ViewStyle>;
    background?: boolean;
  }>;
};

export function Table<DataObject extends { id: number }>(
  props: TableProps<DataObject>
): JSX.Element {
  const { rows, dataSource, nameColumnWidth, valueColumnWidth, scrollable } = props;

  const { width } = useWindowDimensions();

  const renderRows = () => {
    return rows.map((row, index) => {
      const { dataIndex, render, textStyle, rowStyle, background, name, key } = row;
      const hasBackground = typeof background !== 'undefined' ? background : index % 2 === 1;

      return (
        <TableRow style={rowStyle} background={hasBackground} key={key}>
          <TableCol columnStyle={{ width: nameColumnWidth }} textStyle={textStyle}>
            {name}
          </TableCol>
          {dataSource.map((data, index) => {
            let value = dataIndex ? data[dataIndex] : undefined;
            let linkedValue;

            if (typeof render === 'function') {
              value = render(value, data, index);
            }

            return (
              <TableCol
                key={data.id}
                columnStyle={[styles.columnValue, { width: valueColumnWidth }]}
                textStyle={textStyle}
              >
                {linkedValue || value}
              </TableCol>
            );
          })}
        </TableRow>
      );
    });
  };

  return (
    <ScrollView horizontal>
      {scrollable ? (
        <ScrollView stickyHeaderIndices={[0]} style={{ minWidth: width }}>
          {renderRows()}
        </ScrollView>
      ) : (
        <View style={{ minWidth: width }}>{renderRows()}</View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  columnValue: {
    alignItems: 'flex-end',
  },
});
