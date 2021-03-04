import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';

import { UserType } from '../../types';
import { COLORS } from '../../colors';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  drawer: {
    width: 300,
  },
});

type DrawerNavigatorTypes = {
  children: ReactNode;
  user?: UserType;
  signOut: () => void;
};

export const DrawerNavigator = (props: DrawerNavigatorTypes): JSX.Element => {
  const { children, user, signOut } = props;

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: COLORS.MAIN,
        inactiveTintColor: COLORS.BLACK,
      }}
      drawerStyle={styles.drawer}
      edgeWidth={80}
      drawerContent={contentProps => (
        <DrawerContent {...contentProps} user={user} signOut={signOut} />
      )}
    >
      {children}
    </Drawer.Navigator>
  );
};

DrawerNavigator.Screen = Drawer.Screen;
