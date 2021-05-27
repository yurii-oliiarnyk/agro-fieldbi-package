import React from 'react';
import i18n from 'i18n-js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import screens from './screens';
import { COLORS } from '../constants';
import CustomDrawer from './Drawer';

import TaskboardNavigator from '../screens/taskboard/TaskboardNavigator';
import MonitoringCenterNavigator from '../screens/monitoringCenter/MonitoringCenterNavigator';
import AnalyticsNavigator from '../screens/analytics/AnalyticsNavigator';
import ProfileNavigator from '../screens/profile/ProfileNavigator';
import LandBankNavigator from './LandBankNavigator';
import Tasks from '../screens/tasks/Tasks';

const Drawer = createDrawerNavigator();

const AuthorizedNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: COLORS.MAIN,
        inactiveTintColor: COLORS.BLACK
      }}
      options={{
        drawerWidth: 300,
        edgeWidth: 80
      }}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name={screens.TaskboardNavigator}
        options={{ drawerLabel: i18n.t('pages.taskboard') }}
        component={TaskboardNavigator}
      />
      <Drawer.Screen
        name={screens.MonitoringCenterNavigator}
        options={{ drawerLabel: i18n.t('pages.monitoringCenter') }}
        component={MonitoringCenterNavigator}
      />
      <Drawer.Screen
        name={screens.AnalyticsNavigator}
        options={{ drawerLabel: i18n.t('pages.analytic') }}
        component={AnalyticsNavigator}
      />
      <Drawer.Screen
        name={screens.ProfileNavigator}
        options={{ drawerLabel: i18n.t('pages.user') }}
        component={ProfileNavigator}
      />
      <Drawer.Screen
        name={screens.LandBank}
        options={{ drawerLabel: i18n.t('generals.landBank') }}
        component={LandBankNavigator}
      />
      <Drawer.Screen
        name={screens.Tasks}
        options={{ drawerLabel: i18n.t('pages.tasks') }}
        component={Tasks}
      />
    </Drawer.Navigator>
  );
};

export default AuthorizedNavigator;
