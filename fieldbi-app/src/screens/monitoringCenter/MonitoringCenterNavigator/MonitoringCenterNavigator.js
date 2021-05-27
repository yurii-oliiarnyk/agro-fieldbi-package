import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../../../navigation/screens';
import MonitoringCenter from '../MonitoringCenter';
import MonitoringCenterFilter from '../MonitoringCenterFilter';
import { stackNavigationOptions } from '../../../navigation/styles';

const Stack = createStackNavigator();

const MonitoringCenterNavigator = () => {
  return (
    <Stack.Navigator {...stackNavigationOptions}>
      <Stack.Screen
        name={screens.MonitoringCenter}
        component={MonitoringCenter}
        options={{
          header: () => null,
          headerTransparent: true
        }}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Стани договорів'
        }}
        name={screens.MonitoringCenterFilter}
        component={MonitoringCenterFilter}
      />
    </Stack.Navigator>
  );
};

export default MonitoringCenterNavigator;
