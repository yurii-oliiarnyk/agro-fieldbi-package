import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../colors';

export const ResourcesListItemInfo = props => {
  const { name, value, small } = props;

  const textStyles = [styles.text];

  if (small) {
    textStyles.push(styles.small);
  }

  return (
    <Text style={textStyles} numberOfLines={1}>
      {name && (
        <Text>
          {name}
          {': '}
        </Text>
      )}
      <Text style={styles.value}>{value}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.LIGHT,
  },
  small: {
    fontSize: 10,
  },
  value: {
    color: COLORS.GREY,
  },
});

ResourcesListItemInfo.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  small: PropTypes.bool,
};
