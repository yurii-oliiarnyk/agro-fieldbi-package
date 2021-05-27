import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants';

const AppHeaderIcon = props => (
  <HeaderButton
    iconSize={24}
    IconComponent={Icon}
    color={Platform.OS === 'android' ? '#fff' : COLORS.MAIN}
    {...props}
  />
);

export default AppHeaderIcon;
