import { PLATFORM_PROTOCOL as PROTOCOL, PLATFORM_SUFFIX as SUFFIX } from '../../config';

export const getAPI = value => {
  return `${PROTOCOL}${value}${SUFFIX}`;
};
