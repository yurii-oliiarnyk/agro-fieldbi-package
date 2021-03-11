import i18n from 'i18n-js';

export const applyThousandSeparator = (str: string | number, thousandSeparator: string): string => {
  const numParts = str.toString().split('.');

  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  return numParts.join('.');
};

export const getSuffix = (type: string): string => {
  switch (type) {
    case 'percentage':
      return ' %';
    case 'area':
      return ` ${i18n.t('generals.areaUnits')}`;
    case 'price':
      return ` ${i18n.t('generals.currencyUnits')}`;

    default:
      return '';
  }
};
