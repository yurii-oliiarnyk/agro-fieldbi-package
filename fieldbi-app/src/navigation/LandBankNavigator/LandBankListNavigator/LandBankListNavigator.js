import React from 'react';
import AppBottomTabIcon from '../../../components/AppBottomTabIcon';
import { bottomTabOptions } from '../../styles';
import { BottomTabNavigator as Tab } from '../../utils';

import { tabsConfig } from './config';

const LandBankListNavigator = () => (
  <Tab.Navigator {...bottomTabOptions}>
    {tabsConfig.map(tab => (
      <Tab.Screen
        key={tab.name}
        name={tab.name}
        component={tab.component}
        options={() => ({
          tabBarIcon: props => <AppBottomTabIcon {...props} Icon={tab.icon} />,
          tabBarLabel: tab.label
        })}
      />
    ))}
  </Tab.Navigator>
);

export default LandBankListNavigator;
