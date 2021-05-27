import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import screens from './screens';
import SignInScreen from '../screens/auth/SignInScreen';
import DomainScreen from '../screens/auth/DomainScreen';
import BlockedScreen from '../screens/auth/BlockedScreen';
import AppLoader from '../components/AppLoader';
import { DOMAIN_KEY } from '../config';
import useMountedState from '../hooks/useMountedState';

const Stack = createStackNavigator();

const UnauthorizedNavigator = () => {
  const [isDomainValid, setIsDomainValid] = useState();
  const [domainChecked, setDomainChecked] = useState(false);

  const isMounted = useMountedState();

  const checkDomain = () => {
    const getDomain = new Promise((res, rej) => {
      try {
        const domain = AsyncStorage.getItem(DOMAIN_KEY);
        res(domain);
      } catch (e) {
        rej();
      }
    });

    getDomain.then(domain => {
      if (isMounted) {
        const isDomainValid = domain && domain.trim().length > 0;
        setIsDomainValid(isDomainValid);
        setDomainChecked(true);
      }
    });
  };

  useEffect(() => {
    checkDomain();
  }, []);

  if (!domainChecked) {
    return <AppLoader />;
  }

  const initialRouteName = isDomainValid ? screens.SignIn : screens.Domain;

  return (
    <Stack.Navigator mode="modal" headerMode="none" initialRouteName={initialRouteName}>
      <Stack.Screen name={screens.Domain} component={DomainScreen} />
      <Stack.Screen name={screens.SignIn} component={SignInScreen} />
      <Stack.Screen name={screens.UserBlocked} component={BlockedScreen} />
    </Stack.Navigator>
  );
};

export default UnauthorizedNavigator;
