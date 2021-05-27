import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { View, Text, StyleSheet } from 'react-native';
import DataIcon from '../../assets/svg/data.svg';

const Empty = props => {
  const { description = i18n.t('ui.noData'), style } = props;

  return (
    <View style={[styles.wrapper, style]}>
      <DataIcon />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center'
  }
});

Empty.propTypes = {
  description: PropTypes.string,
  style: PropTypes.object
};

export default Empty;
