export const DEBUG = process.env.NODE_ENV === 'development';

export const TOKEN_KEY = 'authenticationToken';
export const DOMAIN_KEY = 'domain';

export const PLATFORM_PROTOCOL = !DEBUG ? 'https://' : '';
export const PLATFORM_SUFFIX = !DEBUG ? '.fieldbi.io' : '';

export const getAPI = (value: string): string => {
  return `${PLATFORM_PROTOCOL}${value}${PLATFORM_SUFFIX}`;
};
