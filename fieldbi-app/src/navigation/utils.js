import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const MaterialBottomTabNavigator = createMaterialBottomTabNavigator();
const IOSBottomTabNavigator = createBottomTabNavigator();

export const BottomTabNavigator =
  Platform.OS === 'android' ? MaterialBottomTabNavigator : IOSBottomTabNavigator;
