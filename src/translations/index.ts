import i18n from 'i18n-js';

import en from './en';
import uk from './uk';

export const setTranslations = (): void => {
  const mergedTranslations = {
    en,
    uk,
  };

  i18n.translations = mergedTranslations;
  i18n.locale = 'uk';
};
