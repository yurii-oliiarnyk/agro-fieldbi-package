import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../constants';

const AnalyticsTableTr = props => {
  const { children, background, rowStyle } = props;

  const stylesRow = [styles.row, rowStyle];

  if (background) {
    stylesRow.push(styles.background);
  }

  return <View style={stylesRow}>{children}</View>;
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  background: {
    backgroundColor: COLORS.GREY_BG
  }
});

AnalyticsTableTr.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  background: PropTypes.bool,
  rowStyle: PropTypes.object
};

export default AnalyticsTableTr;
