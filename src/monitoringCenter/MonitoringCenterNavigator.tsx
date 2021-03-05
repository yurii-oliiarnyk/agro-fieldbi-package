import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationOptions } from '../navigation/styles';
import { MonitoringCenter } from './MonitoringCenter';
import { MonitoringCenterFilter } from './MonitoringCenterFilter/MonitoringCenterFilter';
import { SCREENS } from './config';

const Stack = createStackNavigator();

type MonitoringCenterNavigatorTypes = {
  fields?: boolean;
  lands?: boolean;
};

export const MonitoringCenterNavigator: React.FC<MonitoringCenterNavigatorTypes> = (
  props
): JSX.Element => {
  const { fields, lands } = props;

  return (
    <Stack.Navigator {...stackNavigationOptions}>
      <Stack.Screen
        name={SCREENS.MAP}
        options={{
          header: () => null,
          headerTransparent: true,
        }}
      >
        {stackProps => (
          <MonitoringCenter params={stackProps.route.params} fields={fields} lands={lands} />
        )}
      </Stack.Screen>
      <Stack.Screen
        options={{
          headerTitle: 'Стани договорів',
        }}
        name={SCREENS.MAP_FILTER}
        component={MonitoringCenterFilter}
      />
    </Stack.Navigator>
  );
};
