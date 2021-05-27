import React from 'react';
import PropTypes from 'prop-types';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../constants';

const LocationControl = props => {
  const { onPress } = props;

  return (
    <FAB
      small
      icon={({ size, color }) => <Icon name="my-location" color={color} size={size} />}
      onPress={onPress}
      style={{ backgroundColor: COLORS.MAIN }}
    />
  );
};

LocationControl.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default LocationControl;
