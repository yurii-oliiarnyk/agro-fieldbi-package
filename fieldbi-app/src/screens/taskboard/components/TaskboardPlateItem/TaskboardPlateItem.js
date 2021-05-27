import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import OutputNumber from '../../../../components/UI/OutputNumber';
import TaskboardPlateItemWrapper from '../TaskboardPlateItemWrapper';

const TaskboardPlateItem = props => {
  const { linkParams, title, value, valueSeparator, last } = props;

  const linkable =
    linkParams && (Array.isArray(value) ? value : [value]).some(value => value.count > 0);

  const renderValue = values => {
    if (!Array.isArray(values)) {
      const value = values;

      return (
        <Text>
          <Text style={styles.value}>
            <OutputNumber value={value.count} decimalScale={0} />
          </Text>
          <Text style={styles.valueUnit}>{` ${value.unit}`}</Text>
        </Text>
      );
    }

    if (valueSeparator) {
      const [firstValue, secondValue] = values;

      return (
        <Text>
          <Text style={styles.value}>
            <OutputNumber value={firstValue.count} decimalScale={0} />
          </Text>
          <Text style={styles.valueUnit}>{` ${firstValue.unit}`}</Text>
          <Text style={styles.separator}>{` ${valueSeparator} `}</Text>
          <Text style={styles.value}>
            <OutputNumber value={secondValue.count} decimalScale={0} />
          </Text>
          <Text style={styles.valueUnit}>{` ${secondValue.unit}`}</Text>
        </Text>
      );
    }

    return values.map(value => (
      <View style={{ flex: 1 }} key={value.key}>
        <View>
          <Text style={styles.value}>
            <OutputNumber value={value.count} decimalScale={0} />
          </Text>
        </View>
        <View>
          <Text style={styles.valueUnit}>{value.unit}</Text>
        </View>
      </View>
    ));
  };

  return (
    <TaskboardPlateItemWrapper
      style={[styles.wrapper, last && styles.last]}
      linkable={linkable}
      linkParams={linkParams}
    >
      <View style={styles.titleView}>
        <Text style={{ fontSize: 16 }}>{`${title}:`}</Text>
      </View>
      <View style={styles.valuesView}>{renderValue(value)}</View>
    </TaskboardPlateItemWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8
  },
  last: {
    marginBottom: 0
  },
  titleView: {
    width: '55%',
    maxWidth: '55%',
    paddingRight: 12
  },
  valuesView: {
    width: '45%',
    maxWidth: '45%',
    flexDirection: 'row'
  },
  value: {
    color: '#202030',
    fontWeight: 'bold',
    fontSize: 18
  },
  valueUnit: {
    color: '#202030',
    fontWeight: 'bold',
    fontSize: 12
  },
  separator: {
    color: '#606060',
    fontWeight: 'bold',
    fontSize: 18
  }
});

const valueType = PropTypes.shape({
  key: PropTypes.string,
  count: PropTypes.number.isRequired,
  unit: PropTypes.node.isRequired
});

TaskboardPlateItem.propTypes = {
  title: PropTypes.string.isRequired,
  valueSeparator: PropTypes.string,
  value: PropTypes.oneOfType([valueType, PropTypes.arrayOf(valueType)]).isRequired,
  linkParams: PropTypes.object,
  last: PropTypes.bool
};

export default TaskboardPlateItem;
