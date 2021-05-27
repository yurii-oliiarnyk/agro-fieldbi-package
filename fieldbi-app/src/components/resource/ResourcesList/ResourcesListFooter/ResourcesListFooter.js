import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import AppLoader from '../../../AppLoader';

const ResourcesListFooter = props => {
  const { show } = props;

  if (!show) return null;

  return (
    <View style={styles.wrapper}>
      <AppLoader />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
});

ResourcesListFooter.propTypes = {
  show: PropTypes.bool.isRequired
};

export default ResourcesListFooter;
