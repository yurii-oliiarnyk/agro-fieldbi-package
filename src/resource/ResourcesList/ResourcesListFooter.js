import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Loader } from '../../UI/Loader';

export const ResourcesListFooter = props => {
  const { show } = props;

  if (!show) return null;

  return (
    <View style={styles.wrapper}>
      <Loader />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
});

ResourcesListFooter.propTypes = {
  show: PropTypes.bool.isRequired,
};
