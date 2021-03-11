import React from 'react';
import { Switch as NativeSwitch, SwitchProps } from 'react-native';
import { COLORS } from '../colors';

export const Switch: React.FC<SwitchProps> = props => {
  return (
    <NativeSwitch
      thumbColor="#fff"
      trackColor={{ false: 'rgba(0, 0, 0, 0.25)', true: COLORS.MAIN }}
      {...props}
    />
  );
};
