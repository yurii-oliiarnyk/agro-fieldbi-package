export const DEBUG = process.env.NODE_ENV === 'development';

export const TOKEN_KEY = 'authenticationToken';
export const DOMAIN_KEY = 'domain';

export const PLATFORM_PROTOCOL = !DEBUG ? 'https://' : '';
export const PLATFORM_SUFFIX = !DEBUG ? '.fieldbi.io' : '';

export const DATE_FORMAT = 'DD/MM/YYYY';
export const MONTH_FORMAT = 'MM/YYYY';
export const TIME_DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const FILTER_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const YEAR_FORMAT = 'YYYY';

export const getAPI = (value: string): string => {
  return `${PLATFORM_PROTOCOL}${value}${PLATFORM_SUFFIX}`;
};
