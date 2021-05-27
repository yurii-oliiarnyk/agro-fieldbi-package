import React from 'react';
import { Switch } from 'react-native';
import { COLORS } from '../../../constants';

const AppSwitch = props => {
  return (
          <Switch {...props} thumbColor="#fff" trackColor={{ false: 'rgba(0, 0, 0, 0.25)', true: COLORS.MAIN }} />
  );
};

export default AppSwitch;
