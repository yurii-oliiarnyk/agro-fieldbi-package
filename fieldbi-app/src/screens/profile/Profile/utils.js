import i18n from 'i18n-js';

export const getRoleName = role => {
  switch (role) {
    case 'ROLE_USER':
      return i18n.t('roles.user');

    case 'ROLE_ADMIN':
      return i18n.t('roles.admin');

    default:
      return null;
  }
};
