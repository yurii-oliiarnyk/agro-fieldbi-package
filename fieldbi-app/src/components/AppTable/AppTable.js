import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AppTableRow from './AppTableRow';
import { COLORS } from '../../constants';
import AppLoader from '../AppLoader';
import Empty from '../Empty';
import { useWindowDimensions } from '../../hooks';

const AppTable = props => {
  const { dataSource, columns, loading } = props;

  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.table} horizontal>
      <ScrollView style={{ minWidth: width }}>
        <View style={[styles.row, styles.headRow]}>
          {columns.map(column => (
            <View key={column.key} style={{ ...styles.column, ...column.style }}>
              <Text style={[styles.columnText, styles.headText]}>{column.title}</Text>
            </View>
          ))}
        </View>
        {dataSource.length > 0 ? (
          dataSource.map(row => (
            <AppTableRow row={row} columns={columns} key={row.key} styles={styles} />
          ))
        ) : (
          <View style={[styles.row, { justifyContent: 'center' }]}>
            <Empty />
          </View>
        )}
      </ScrollView>
      {loading && <AppLoader style={styles.loader} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: COLORS.GREY_BG,
    borderBottomWidth: 2,
    borderStyle: 'solid'
  },
  headRow: {
    backgroundColor: COLORS.GREY_BG
  },
  headText: {
    fontWeight: 'bold',
    color: '#202030'
  },
  column: {
    padding: 8
  },
  columnText: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.65)'
  },
  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
});

AppTable.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired
    })
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired
    })
  )
};

export default AppTable;
