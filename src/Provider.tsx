import React, { ReactNode, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { setTranslations, TranslationsTypes } from './translations';

type ProviderProps = {
  children: ReactNode;
  translations: TranslationsTypes;
};

export const Provider: React.FC<ProviderProps> = props => {
  const { children, translations } = props;

  useEffect(() => {
    setTranslations(translations);
  }, [translations]);

  return (
    <PaperProvider>
      {children}
      <FlashMessage position="bottom" />
    </PaperProvider>
  );
};
