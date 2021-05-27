import moment from 'moment';
import { DATE_FORMAT, YEAR_FORMAT, TIME_DATE_FORMAT } from '../config';

/**
 * Parsed date to momemt object
 * @param {number|string} value unix timestamp
 *
 * @returns {object} momemnt object
 */
const parsedMoment = value => {
  const isValueUnix = typeof value === 'number';

  if (isValueUnix) {
    return moment.unix(value);
  }

  return moment(value);
};

/**
 * Formatted Date
 * @param {number|string} unix timestamp|date nonformated string
 *
 * @returns {string} formatted date
 */
export const getFormattedDate = value => parsedMoment(value).format(DATE_FORMAT);

/**
 * Formatted Time-date
 * @param {number|string} unix timestamp|date nonformated string
 *
 * @returns {string} formatted time-date value
 */
export const getFormattedTimeDate = value => parsedMoment(value).format(TIME_DATE_FORMAT);

/**
 * Formatted Year
 * @param {number|string} value timestamp
 *
 * @returns {string} formatted year
 */
export const getFormattedYear = value => parsedMoment(value).format(YEAR_FORMAT);
