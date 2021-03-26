import moment, { MomentInput, Moment } from 'moment';
import { DATE_FORMAT, YEAR_FORMAT, TIME_DATE_FORMAT } from '../config';

type ParsedMomentValue = number | MomentInput;

/**
 * Parsed date to momemt object
 * @param {number|MomentInput} value unix timestamp
 *
 * @returns {Moment} moment object
 */
const parsedMoment = (value: ParsedMomentValue): Moment => {
  return typeof value === 'number' ? moment.unix(value) : moment(value);
};

/**
 * Formatted Date
 * @param {number|MomentInput} unix timestamp|date nonformated string
 *
 * @returns {Moment} formatted date
 */
export const getFormattedDate = (value: ParsedMomentValue): string =>
  parsedMoment(value).format(DATE_FORMAT);

/**
 * Formatted Time-date
 * @param {number|MomentInput} unix timestamp|date nonformated string
 *
 * @returns {Moment} formatted time-date value
 */
export const getFormattedTimeDate = (value: ParsedMomentValue): string =>
  parsedMoment(value).format(TIME_DATE_FORMAT);

/**
 * Formatted Year
 * @param {number|MomentInput} value timestamp
 *
 * @returns {Moment} formatted year
 */
export const getFormattedYear = (value: ParsedMomentValue): string =>
  parsedMoment(value).format(YEAR_FORMAT);
