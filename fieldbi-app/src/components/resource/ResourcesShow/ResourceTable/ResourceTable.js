import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from './styles';

const ResourceTable = props => {
  const { data, style } = props;

  return (
    <View style={[styles.table, style]}>
      {data
        .filter(row => row.value)
        .map((row, index) => {
          let { value } = row;
          const { render } = row;

          const rowStyle = [styles.row];
          const hasBackground = index % 2;

          if (hasBackground) {
            rowStyle.push(styles.background);
          }

          if (row.html) {
            const regex = /(<([^>]+)>)/gi;
            value = value.replace(regex, '');
          }

          const name = `${row.name}:`;

          if (render) {
            value = render(value, {
              textStyle: { ...styles.text, ...styles.value },
              linkStyle: styles.link
            });
          } else {
            value = <Text style={[styles.text, styles.value]}>{value}</Text>;
          }

          return (
            <View key={row.key} style={rowStyle}>
              <View style={styles.column}>
                <Text style={[styles.text, styles.name]}>{name}</Text>
              </View>
              <View style={styles.column}>{value}</View>
            </View>
          );
        })}
    </View>
  );
};

ResourceTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.node,
      render: PropTypes.func
    })
  ).isRequired,
  style: PropTypes.object
};

export default ResourceTable;
