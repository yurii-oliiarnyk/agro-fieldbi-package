import React from 'react';
import { Provider } from 'react-redux';
import { RootNavigator } from './src/navigation/RootNavigator';
import { store } from './src/store';
import { translations } from './src/translations';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as AgroProvider } from 'agro-package';

const App: React.FC = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <AgroProvider translations={translations}>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </AgroProvider>
    </SafeAreaProvider>
  );
};

export default App;
