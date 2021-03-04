import React from 'react';
import { Platform } from 'react-native';
import {
  HeaderButton as HeaderButtonComponent,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../colors';

export const HeaderButton: React.FC<HeaderButtonProps> = (props): JSX.Element => (
  <HeaderButtonComponent
    iconSize={24}
    IconComponent={Icon}
    color={Platform.OS === 'android' ? '#fff' : COLORS.MAIN}
    {...props}
  />
);
