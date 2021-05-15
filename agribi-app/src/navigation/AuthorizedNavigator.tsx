import React from 'react';
import i18n from 'i18n-js';
import { connect } from 'react-redux';
import { DrawerNavigator, UserType, MONITORING_SCREENS } from 'agro-package';
import { signOut as signOutAction } from '../store/auth';
import { RootState } from '../store';
import { FieldsNavigator } from '../screens/fields/FieldsNavigator';
import { TaskOfScoutingNavigator } from '../screens/taskOfScouting/TaskOfScoutingNavigator';
import { ScoutingReportsNavigator } from '../screens/scoutingReports/ScoutingReportsNavigator';
import { MonitoringCenterScreen } from '../screens/MonitoringCenterScreen';

type AuthorizedNavigatorContentTypes = {
  user?: UserType;
  signOut: () => void;
};

const AuthorizedNavigatorContent: React.FC<AuthorizedNavigatorContentTypes> = props => {
  const { user, signOut } = props;

  return (
    <DrawerNavigator signOut={signOut} user={user}>
      <DrawerNavigator.Screen
        name={MONITORING_SCREENS.MAP_STACK}
        component={MonitoringCenterScreen}
        options={{ drawerLabel: i18n.t('pages.map') }}
      />
      <DrawerNavigator.Screen
        name="Fields"
        options={{ drawerLabel: i18n.t('pages.fields') }}
        component={FieldsNavigator}
      />
      <DrawerNavigator.Screen
        name="TaskOfScouting"
        options={{ drawerLabel: i18n.t('pages.taskOfScout') }}
        component={TaskOfScoutingNavigator}
      />
      <DrawerNavigator.Screen
        name="ScoutingReports"
        options={{ drawerLabel: i18n.t('pages.scoutingReport') }}
        component={ScoutingReportsNavigator}
      />
    </DrawerNavigator>
  );
};

export const AuthorizedNavigator = connect(
  (state: RootState) => {
    return {
      user: state.auth.user,
    };
  },
  {
    signOut: signOutAction,
  }
)(AuthorizedNavigatorContent);
