import React from 'react';
import i18n from 'i18n-js';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../../../navigation/screens';
import DrawerButton from '../../../navigation/Drawer/DrawerButton';
import { stackNavigationOptions } from '../../../navigation/styles';

import AnalyticsList from '../AnalyticsList';
import AnalyticsSubdivisions from '../AnalyticsSubdivisions';
import {
  AnalyticsGeneral,
  AnalyticsLandType,
  AnalyticsAgreementState,
  AnalyticsAgreementYear,
  AnalyticsAgronomistConclusion,
  AnalyticsDocumentLocation,
  AnalyticsPurpose,
  AnalyticsSoilType
} from '../analyticsDetails/analyticsDetailsScreens';

const Stack = createStackNavigator();

const AnalyticsNavigator = () => {
  return (
    <Stack.Navigator {...stackNavigationOptions}>
      <Stack.Screen
        name={screens.AnalyticsList}
        component={AnalyticsList}
        options={{
          headerTitle: i18n.t('pages.analytic'),
          headerLeft: props => <DrawerButton {...props} />
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsSubdivisions}
        component={AnalyticsSubdivisions}
        options={{
          headerTitle: i18n.t('analytics.selectSubdivion')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsGeneral}
        component={AnalyticsGeneral}
        options={{
          headerTitle: i18n.t('analytics.generals.name')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsLandType}
        component={AnalyticsLandType}
        options={{
          headerTitle: i18n.t('analytics.landType.name')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsDocumentLocation}
        component={AnalyticsDocumentLocation}
        options={{
          headerTitle: i18n.t('analytics.documentLocation.name')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsSoilType}
        component={AnalyticsSoilType}
        options={{
          headerTitle: i18n.t('analytics.soilType.name')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsPurpose}
        component={AnalyticsPurpose}
        options={{
          headerTitle: i18n.t('analytics.landPurpose.name')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsAgreementState}
        component={AnalyticsAgreementState}
        options={{
          headerTitle: i18n.t('analytics.agreementState.name')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsAgreementYear}
        component={AnalyticsAgreementYear}
        options={{
          headerTitle: i18n.t('analytics.agreementYear.name')
        }}
      />
      <Stack.Screen
        name={screens.AnalyticsAgronomistConclusion}
        component={AnalyticsAgronomistConclusion}
        options={{
          headerTitle: i18n.t('analytics.agronomistConclusion.name')
        }}
      />
    </Stack.Navigator>
  );
};

export default AnalyticsNavigator;
