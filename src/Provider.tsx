import React, { ReactNode, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import { setTranslations } from './translations';

type ProviderProps = {
  children: ReactNode;
};

export const Provider: React.FC<ProviderProps> = props => {
  const { children } = props;

  useEffect(() => {
    setTranslations();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        {children}
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </PaperProvider>
  );
};
