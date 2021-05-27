export const DEBUG = process.env.NODE_ENV === 'development';

export const TOKEN_KEY = 'authenticationToken';
export const DOMAIN_KEY = 'domain';

export const PLATFORM_PROTOCOL = 'https://';
export const PLATFORM_SUFFIX = !DEBUG ? '.fieldbi.io' : '';

export const LIMIT = 25;
export const START_PAGE = 1;

export const DATE_FORMAT = 'DD/MM/YYYY';
export const MONTH_FORMAT = 'MM/YYYY';
export const TIME_DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const FILTER_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const YEAR_FORMAT = 'YYYY';

export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  OBSERVER: 'ROLE_OBSERVER',
  USER: 'ROLE_USER',
  LANDLORD: 'ROLE_LANDLORD'
};
