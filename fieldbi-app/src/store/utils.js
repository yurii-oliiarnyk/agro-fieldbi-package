import { showMessage } from 'react-native-flash-message';
import i18n from 'i18n-js';

export function displayHttpError(context, status) {
  if (status === 403) {
    showMessage({
      description: `${status} ${context}. ${i18n.t('errors.noAccess')}`,
      message: i18n.t('errors.error'),
      type: 'danger'
    });
  }

  if (status === 400) {
    showMessage({
      description: `${status} ${context}`,
      message: i18n.t('errors.error'),
      type: 'danger'
    });
  }

  if (status === 401) {
    showMessage({
      description: i18n.t('errors.unauthorized'),
      message: i18n.t('errors.error'),
      type: 'danger'
    });
  }

  if (status > 401 && status !== 403) {
    showMessage({
      description: `${status} ${context}`,
      message: i18n.t('errors.error'),
      type: 'danger'
    });
  }
}
