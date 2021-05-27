import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import { Provider as AgroProvider } from 'agro-package';
import './locations';

import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';

import store from './store';
import RootNavigator from './navigation/RootNavigator';
import ErrorBoundary from './components/ErrorBoundary';

export default function Root() {
  return (
    <StyleProvider style={getTheme(platform)}>
      <AgroProvider>
        <Provider store={store}>
          <ErrorBoundary navigator={navigator}>
            <RootNavigator />
            <FlashMessage position="bottom" />
          </ErrorBoundary>
        </Provider>
      </AgroProvider>
    </StyleProvider>
  );
}
