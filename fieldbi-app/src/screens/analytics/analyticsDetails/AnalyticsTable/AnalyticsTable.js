import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView } from 'react-native';
import AnalyticsTableTr from './AnalyticsTableTr';
import AnalyticsTableCol from './AnalyticsTableCol/AnalyticsTableCol';
import { useWindowDimensions } from '../../../../hooks';

const removeEmtpyRows = (rows, dataSource) =>
  rows.filter(row => {
    const { dataIndex, render, hideEmpty } = row;

    if (!hideEmpty) {
      return true;
    }

    return dataSource.some(data => {
      let value = dataIndex ? data[dataIndex] : undefined;

      if (typeof render === 'function') {
        [value] = render(value, data);
      }

      return !!value;
    });
  });

const AnalyticsTable = props => {
  const { rows, dataSource } = props;

  const { width } = useWindowDimensions();

  const withoutEmptyRows = removeEmtpyRows(rows, dataSource);

  const rowsWithHeaders = [
    {
      key: 'name',
      dataIndex: 'name',
      name: '',
      textStyle: {
        fontSize: 12,
        textAlign: 'right'
      },
      rowStyle: {
        fontSize: 12,
        alignItems: 'flex-end'
      }
    },
    ...withoutEmptyRows
  ];

  return (
    <ScrollView horizontal>
      <ScrollView stickyHeaderIndices={[0]} style={{ minWidth: width }}>
        {rowsWithHeaders.map((row, index) => {
          const { dataIndex, render, textStyle, rowStyle, background, name, key } = row;
          const hasBackground = typeof background !== 'undefined' ? background : index % 2 === 1;

          return (
            <AnalyticsTableTr rowStyle={rowStyle} background={hasBackground} key={key}>
              <AnalyticsTableCol columnStyle={styles.columnName} textStyle={textStyle}>
                {name}
              </AnalyticsTableCol>
              {dataSource.map(data => {
                let value = dataIndex ? data[dataIndex] : undefined;
                let linkedValue;

                if (typeof render === 'function') {
                  [value, linkedValue] = render(value, data);
                }

                return (
                  <AnalyticsTableCol
                    key={data.id}
                    columnStyle={styles.columnValue}
                    textStyle={textStyle}
                  >
                    {linkedValue || value}
                  </AnalyticsTableCol>
                );
              })}
            </AnalyticsTableTr>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

AnalyticsTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string,
      dataIndex: PropTypes.string,
      render: PropTypes.func
    })
  ).isRequired,
  dataSource: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  columnName: {
    width: 195
  },
  columnValue: {
    alignItems: 'flex-end',
    width: 100
  }
});

export default AnalyticsTable;
