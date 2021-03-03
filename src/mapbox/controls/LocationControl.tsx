import React from 'react';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../colors';

type LocationControlTypes = {
  onPress: () => void;
};

export const LocationControl: React.FC<LocationControlTypes> = (props): JSX.Element => {
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
