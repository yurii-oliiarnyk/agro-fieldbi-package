import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

const AppList = props => {
  const { data } = props;

  return (
    <View>
      {data
        .filter(row => row.value)
        .map(row => (
          <View key={row.key} style={styles.row}>
            <Text style={[styles.text, styles.name]}>
              {row.name}
              {':'}
            </Text>
            <Text style={[styles.text, styles.value]}>{row.value}</Text>
          </View>
        ))}
    </View>
  );
};

AppList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string
    })
  ).isRequired
};

export default AppList;
