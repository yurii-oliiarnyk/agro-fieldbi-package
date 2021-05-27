import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import { COLORS } from '../../constants';

const AppLoader = ({ size, style }) => (
  <View style={[styles.wrap, style]}>
    <ActivityIndicator size={size} animating color={COLORS.MAIN} />
  </View>
);

AppLoader.defaultProps = {
  size: 'large'
};

AppLoader.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  style: PropTypes.object
};

export default AppLoader;
