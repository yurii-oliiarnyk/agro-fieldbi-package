import { Record, Map } from 'immutable';
import { takeEvery, all, put, call } from 'redux-saga/effects';
import i18n from 'i18n-js';
import { displayHttpError } from '../utils';

import MapFieldsRecord from '../records/mapFieldsRecord';
import MapLandRecord from '../records/mapLandRecord';
import axios from '../../axios/axios';

import { arrayToMap } from './utils';

export const moduleName = 'monitoring';
const prefix = `${moduleName} / `;

export const FETCH_FIELDS_REQUEST = `${prefix}FETCH_FIELDS_REQUEST`;
export const FETCH_FIELDS_SUCCESS = `${prefix}FETCH_FIELDS_SUCCESS`;
export const FETCH_FIELDS_ERROR = `${prefix}FETCH_FIELDS_ERROR`;

export const FETCH_LANDS_REQUEST = `${prefix}FETCH_LANDS_REQUEST`;
export const FETCH_LANDS_SUCCESS = `${prefix}FETCH_LANDS_SUCCESS`;
export const FETCH_LANDS_ERROR = `${prefix}FETCH_LANDS_ERROR`;

export const ReducerRecord = Record({
  // fields
  fields: new Map([]),
  fieldsLoading: false,
  fieldsLoaded: false,
  // lands
  lands: new Map([]),
  landsLoading: false,
  landsLoaded: false
});

const initialState = new ReducerRecord();

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_FIELDS_REQUEST:
      return state.set('fieldsLoading', true);

    case FETCH_FIELDS_ERROR:
      return state.set('fieldsLoading', false);

    case FETCH_FIELDS_SUCCESS:
      return state
        .set('fieldsLoading', false)
        .set('fieldsLoaded', true)
        .update('fields', fields => {
          const fieldsLoadedFields = payload.filter(
            field => field.coordinates && field.coordinates.length > 0
          );

          return arrayToMap(fieldsLoadedFields, MapFieldsRecord).merge(fields);
        });

    case FETCH_LANDS_REQUEST:
      return state.set('landsLoading', true);

    case FETCH_LANDS_ERROR:
      return state.set('landsLoading', false);

    case FETCH_LANDS_SUCCESS:
      return state
        .set('landsLoading', false)
        .set('landsLoaded', true)
        .update('lands', fields => {
          // Normalize demo data
          const landsLoadedFields = payload.filter(
            land => land.coordinates && land.coordinates.length > 0
          );

          return arrayToMap(landsLoadedFields, MapLandRecord).merge(fields);
        });

    default:
      return state;
  }
}

/**
 * Action creators
 */
export const fetchFields = () => {
  return {
    type: FETCH_FIELDS_REQUEST
  };
};

export const fetchLands = () => {
  return {
    type: FETCH_LANDS_REQUEST
  };
};

/**
 * selectors
 */

export const fieldsSelector = state => state[moduleName].fields.valueSeq().toArray();
export const landsSelector = state => state[moduleName].lands.valueSeq().toArray();

/**
 * Sagas
 */

export function* fetchFieldsSaga() {
  try {
    const response = yield call(axios.get, '/api/v1/monitoring/fields', {
      params: {
        epsilon: 0.0001
      }
    });

    yield put({ type: FETCH_FIELDS_SUCCESS, payload: response.data.data });
  } catch (error) {
    const { status } = error.response;

    yield put({ type: FETCH_LANDS_ERROR });

    const message = i18n.t('errors.monitoring.fieldLoad');
    displayHttpError(message, status);
  }
}

export function* fetchLandsSaga() {
  try {
    const response = yield call(axios.get, '/api/v1/monitoring/lands', {
      params: {
        epsilon: 0.0001
      }
    });
    yield put({ type: FETCH_LANDS_SUCCESS, payload: response.data.data });
  } catch (error) {
    const { status } = error.response;

    yield put({ type: FETCH_LANDS_ERROR });

    const message = i18n.t('errors.monitoring.landLoad');
    displayHttpError(message, status);
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_FIELDS_REQUEST, fetchFieldsSaga),
    takeEvery(FETCH_LANDS_REQUEST, fetchLandsSaga)
  ]);
}
