import React, { useState, useEffect, useCallback } from 'react';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DomainScreen } from '../screens/DomainScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { showMessage } from 'react-native-flash-message';
import { Loader, axios, DOMAIN_KEY, PLATFORM_PROTOCOL, PLATFORM_SUFFIX } from 'agro-package';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { getUserSuccess } from '../store/auth';

const Stack = createStackNavigator();

export const UnauthorizedNavigator: React.FC = (): JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const [initScreen, setInitScreen] = useState<'Domain' | 'Login'>('Domain');

  const dispatch = useDispatch();

  const tryGetUser = useCallback(async () => {
    const token = await AsyncStorage.getItem(DOMAIN_KEY);

    if (!token) {
      return;
    }

    try {
      const responce = await axios.get('/api/v1/auth/user');
      dispatch(getUserSuccess({ user: responce.data.data }));
    } catch (error) {}
  }, [dispatch]);

  const checkInstance = async (BASE_URL: string) => {
    try {
      const { status } = await axios.get(`${BASE_URL}/health_check/app`);

      return status === 200;
    } catch (e) {
      return false;
    }
  };

  const getInitSettings = useCallback(async () => {
    setLoaded(false);
    const domain = await AsyncStorage.getItem(DOMAIN_KEY);

    if (!domain) {
      setInitScreen('Domain');
      setLoaded(true);
      return;
    }

    const URL = `${PLATFORM_PROTOCOL}${domain}${PLATFORM_SUFFIX}`;
    const instanceValid = await checkInstance(URL);

    if (!instanceValid) {
      showMessage({
        message: i18n.t('errors.error'),
        description: i18n.t('authorization.instance.notValid'),
        type: 'danger',
      });

      setInitScreen('Domain');
      setLoaded(true);
      return;
    }

    await tryGetUser();

    setInitScreen('Login');
    setLoaded(true);

    return;
  }, [tryGetUser]);

  useEffect(() => {
    getInitSettings();
  }, [getInitSettings]);

  if (!loaded) {
    return <Loader />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initScreen}
      screenOptions={{
        cardShadowEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Domain" component={DomainScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
