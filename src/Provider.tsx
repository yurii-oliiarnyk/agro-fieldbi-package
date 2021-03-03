import React, { ReactNode, useEffect } from 'react';
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

  return <>{children}</>;
};