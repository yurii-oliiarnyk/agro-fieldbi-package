import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import { Provider as PaperProvider } from 'react-native-paper';
import './locations';

import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';

import store from './store';
import RootNavigator from './navigation/RootNavigator';
import ErrorBoundary from './components/ErrorBoundary';

export default function Root() {
  return (
    <StyleProvider style={getTheme(platform)}>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <ErrorBoundary navigator={navigator}>
              <RootNavigator />
              <FlashMessage position="bottom" />
            </ErrorBoundary>
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </StyleProvider>
  );
}
