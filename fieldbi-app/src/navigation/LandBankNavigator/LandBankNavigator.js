import React from 'react';
import i18n from 'i18n-js';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerButton from '../Drawer/DrawerButton';

import LandBankListNavigator from './LandBankListNavigator';
import LandBankFilterNavigator from './LandBankFilterNavigator';
import LandBankShowNavigator from './LandBankShowNavigator';
import { getNameByTabIndex, getNameByScreenName } from './LandBankListNavigator/config';

import screens from '../screens';
import { stackNavigationOptions } from '../styles';

const Stack = createStackNavigator();

const getTabName = route => {
  const index = route?.state?.index;

  if (typeof index !== 'undefined') {
    return getNameByTabIndex(index);
  }

  // if not tab active index(in first screen open)
  // try get screen name from params
  const screen = route?.params?.screen;

  if (screen) {
    return getNameByScreenName(screen);
  }

  return 'Земельний банк';
};

const LandBankNavigator = () => {
  return (
    <Stack.Navigator {...stackNavigationOptions}>
      <Stack.Screen
        name={screens.LandBankList}
        component={LandBankListNavigator}
        options={({ route }) => {
          return {
            headerTitle: getTabName(route),
            headerLeft: props => <DrawerButton {...props} />
          };
        }}
      />
      <Stack.Screen
        name={screens.LandBankFilter}
        component={LandBankFilterNavigator}
        options={{ headerTitle: i18n.t('ui.filter.title') }}
      />
      <Stack.Screen
        name={screens.LandBankShow}
        component={LandBankShowNavigator}
        options={({ route }) => {
          const headerTitle = route?.params?.title;

          return {
            headerTitle,
            headerBackTitle: i18n.t('ui.back')
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default LandBankNavigator;
