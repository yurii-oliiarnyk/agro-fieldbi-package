import React from 'react';
import { Provider } from 'react-redux';
import { StyleProvider } from 'native-base';
import { Provider as AgroProvider } from 'agro-package';

import platform from '../native-base-theme/variables/platform';
import getTheme from '../native-base-theme/components';

import store from './store';
import RootNavigator from './navigation/RootNavigator';
import ErrorBoundary from './components/ErrorBoundary';

export default function Root() {
  return (
    <AgroProvider>
      <ErrorBoundary>
        <StyleProvider style={getTheme(platform)}>
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        </StyleProvider>
      </ErrorBoundary>
    </AgroProvider>
  );
}
