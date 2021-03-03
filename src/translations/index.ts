import i18n from 'i18n-js';

import en from './en';
import uk from './uk';

type TranslationObjectType = {
  [key: string]: string | TranslationObjectType;
};

export type TranslationsTypes = {
  en: TranslationObjectType;
  uk: TranslationObjectType;
};

export const setTranslations = (translations: TranslationsTypes): void => {
  const mergedTranslations = {
    en: { ...translations.en, ...en },
    uk: { ...translations.uk, ...uk },
  };

  i18n.translations = mergedTranslations;
  i18n.locale = 'uk';
};
