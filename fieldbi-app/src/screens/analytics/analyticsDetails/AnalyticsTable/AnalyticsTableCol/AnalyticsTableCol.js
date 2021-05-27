import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';

const AnalyticsTableCol = props => {
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

AnalyticsTableCol.propTypes = {
  columnStyle: PropTypes.object,
  textStyle: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

const styles = StyleSheet.create({
  column: {
    paddingHorizontal: 8
  }
});

export default AnalyticsTableCol;
