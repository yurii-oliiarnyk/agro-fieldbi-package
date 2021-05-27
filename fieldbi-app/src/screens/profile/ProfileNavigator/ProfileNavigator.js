import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../../../navigation/screens';
import Profile from '../Profile';
import DrawerButton from '../../../navigation/Drawer/DrawerButton';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: '#fff' }}>
      <Stack.Screen
        name={screens.Profile}
        component={Profile}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: props => <DrawerButton {...props} />
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
