import i18n from 'i18n-js';

export const getAgreementName = type => {
  switch (type) {
    case 1:
      return i18n.t('agreement.rentAgreement');

    case 2:
      return i18n.t('agreement.sublease');

    case 3:
      return i18n.t('agreement.exchangeAgreement');

    case 4:
      return i18n.t('agreement.additionalAgreement');

    case 5:
      return i18n.t('agreement.emphyteusisAgreement');

    default:
      return i18n.t('agreement.singleName');
  }
};

export const getAgreementSubtype = subtype => {
  if (subtype === 1) {
    return i18n.t('land.landGetting');
  }

  if (subtype === 2) {
    return i18n.t('land.landTransfer');
  }

  return subtype;
};

export const getTenantOrganization = type => {
  if (type === 5) {
    return i18n.t('agreement.buyer');
  }

  return i18n.t('agreement.tenantOrganization');
};

export const getLandlordOrganization = type => {
  if (type === 5) {
    return i18n.t('agreement.seller');
  }

  return i18n.t('agreement.landlord');
};

export const getRentAmount = type => {
  if (type === 5) {
    return i18n.t('agreement.contractAmount');
  }

  return i18n.t('agreement.rentAmount');
};
