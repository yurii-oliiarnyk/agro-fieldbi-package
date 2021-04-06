import { all, call, put, select, takeEvery, debounce } from 'redux-saga/effects';
import { Record, OrderedMap, Map } from 'immutable';
import i18n from 'i18n-js';
import { arrayToOrderedMap } from './utils';
import axios from '../axios';
import { showMessage } from 'react-native-flash-message';
import { displayHttpError } from '../utils';

export const moduleName = 'resource';
const prefix = `${moduleName} / `;

const FETCH_RESOURCES_REQUEST = `${prefix}FETCH_RESOURCES_REQUEST`;
const FETCH_RESOURCES_START = `${prefix}FETCH_RESOURCES_START`;
const FETCH_RESOURCES_SUCCESS = `${prefix}FETCH_RESOURCES_SUCCESS`;
const FETCH_RESOURCES_ERROR = `${prefix}FETCH_RESOURCES_ERROR`;

const REFRESH_RESOURCES_REQUEST = `${prefix}REFRESH_RESOURCES_REQUEST`;
const REFRESH_RESOURCES_START = `${prefix}REFRESH_RESOURCES_START`;
const REFRESH_RESOURCES_SUCCESS = `${prefix}REFRESH_RESOURCES_SUCCESS`;
const REFRESH_RESOURCES_ERROR = `${prefix}REFRESH_RESOURCES_ERROR`;

const LOAD_MORE_RESOURCES_REQUEST = `${prefix}LOAD_MORE_RESOURCES_REQUEST`;
const LOAD_MORE_RESOURCES_START = `${prefix}LOAD_MORE_RESOURCES_START`;
const LOAD_MORE_RESOURCES_SUCCESS = `${prefix}LOAD_MORE_RESOURCES_SUCCESS`;
const LOAD_MORE_RESOURCES_ERROR = `${prefix}LOAD_MORE_RESOURCES_ERROR`;

const CREATE_RESOURCE_SUCCESS = `${prefix}CREATE_RESOURCE_SUCCESS`;
const CREATE_RESOURCE_ERROR = `${prefix}CREATE_RESOURCE_ERROR`;
const CREATE_RESOURCE_REQUEST = `${prefix}CREATE_RESOURCE_REQUEST`;
const CLEAR_RESOURCE_ERRORS = `${prefix}CLEAR_RESOURCE_ERRORS`;

const FETCH_RESOURCE_REQUEST = `${prefix}FETCH_RESOURCE_REQUEST`;
const FETCH_RESOURCE_SUCCESS = `${prefix}FETCH_RESOURCE_SUCCESS`;
const FETCH_RESOURCE_ERROR = `${prefix}FETCH_RESOURCE_ERROR`;

const UPDATE_RESOURCE_REQUEST = `${prefix}EDIT_RESOURCE_REQUEST`;
const UPDATE_RESOURCE_SUCCESS = `${prefix}UPDATE_RESOURCE_SUCCESS`;
const UPDATE_RESOURCE_ERROR = `${prefix}EDIT_RESOURCE_ERROR`;

const SEARCH_RESOURCE = `${prefix}SEARCH_RESOURCE`;
const FILTER_RESOURCE = `${prefix}FILTER_RESOURCE`;

const UPDATE_RESOURCES = `${prefix}UPDATE_RESOURCES`;

const LIMIT = 25;
const START_PAGE = 1;

export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  total: 0,
  page: START_PAGE,
  loading: false,
  loaded: false,
  refreshing: false,
  loadingMore: false,
  search: '',
  filterBy: '{}',
  // create
  createResourceSubmitting: false,
  createResourceErrors: new Map({}),
  // update
  updateResourceErrors: new Map({}),
  updateResourceSubmitting: false,
});

export function createResoucesReducer(resorcesName, EntitiesRecord) {
  return (state, action) => {
    const isInitializationCall = state === undefined;
    const shouldRunWrappedReducer = action.name === resorcesName || isInitializationCall;
    return shouldRunWrappedReducer ? reducer(state, action, EntitiesRecord) : state;
  };
}

export default function reducer(state = new ReducerRecord(), action, EntitiesRecord) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_RESOURCE_REQUEST:
      return state.set('createResourceSubmitting', true);

    case CREATE_RESOURCE_SUCCESS:
      return state
        .set('createResourceSubmitting', false)
        .update('entities', entities =>
          arrayToOrderedMap([payload], EntitiesRecord).merge(entities)
        )
        .set('total', total => total + 1);

    case CREATE_RESOURCE_ERROR:
      return state
        .set('createResourceSubmitting', false)
        .set('createResourceErrors', new Map(payload));

    case FETCH_RESOURCES_START:
      return state.set('loading', true);

    case FETCH_RESOURCES_SUCCESS:
      return state
        .set('entities', arrayToOrderedMap(payload.data.data, EntitiesRecord))
        .set('total', payload.total)
        .set('loading', false)
        .set('loaded', true);

    case FETCH_RESOURCES_ERROR:
      return state.set('loading', false).set('loaded', false);

    case REFRESH_RESOURCES_START:
      return state.set('refreshing', true).set('page', START_PAGE);

    case REFRESH_RESOURCES_SUCCESS:
      return state
        .set('entities', arrayToOrderedMap(payload.data.data, EntitiesRecord))
        .set('total', payload.total)
        .set('refreshing', false);

    case REFRESH_RESOURCES_ERROR:
      return state.set('refreshing', false);

    case LOAD_MORE_RESOURCES_START:
      return state.set('loadingMore', true).set('page', payload);

    case LOAD_MORE_RESOURCES_SUCCESS:
      return state
        .update('entities', entities =>
          entities.merge(arrayToOrderedMap(payload.data.data, EntitiesRecord))
        )
        .set('total', payload.total)
        .set('loadingMore', false);

    case FETCH_RESOURCE_SUCCESS:
      const entity = payload.data.data;
      return state.setIn(['entities', entity.id], new EntitiesRecord(entity));

    case UPDATE_RESOURCE_REQUEST:
      return state.set('updateResourceSubmitting', true);

    case UPDATE_RESOURCE_ERROR:
      return state
        .set('updateResourceSubmitting', false)
        .set('updateResourceErrors', new Map(payload));

    case UPDATE_RESOURCE_SUCCESS:
      return state.setIn(['entities', payload.id], new EntitiesRecord(payload));

    case SEARCH_RESOURCE:
      return state.set('search', payload);

    case FILTER_RESOURCE:
      return state.set('filterBy', payload).set('loaded', false);

    case UPDATE_RESOURCES:
      return state.set('page', START_PAGE).set('entities', new OrderedMap({})).set('total', 0);

    case CLEAR_RESOURCE_ERRORS:
      return state
        .set('createResourceErrors', new Map({}))
        .set('updateResourceErrors', new Map({}));

    default:
      return state;
  }
}

/**
 * Action creators
 */
export const fetchResources = resourceName => () => {
  return {
    type: FETCH_RESOURCES_REQUEST,
    name: resourceName,
  };
};

export const refreshResources = resorcesName => () => {
  return {
    type: REFRESH_RESOURCES_REQUEST,
    name: resorcesName,
  };
};

export const loadMoreResources = resorcesName => () => {
  return {
    type: LOAD_MORE_RESOURCES_REQUEST,
    name: resorcesName,
  };
};

export const fetchResource = resourceName => (id, onSuccess) => {
  return {
    name: resourceName,
    type: FETCH_RESOURCE_REQUEST,
    payload: {
      id,
      onSuccess,
    },
  };
};

export const updateResource = resourceName => ({ resourceData, id, onSuccess, successMessage }) => {
  return {
    name: resourceName,
    type: UPDATE_RESOURCE_REQUEST,
    payload: { resourceData, id, onSuccess, successMessage },
  };
};

export const updateResourceError = resourceName => payload => {
  return {
    name: resourceName,
    type: UPDATE_RESOURCE_ERROR,
    payload,
  };
};

export const updateResourceSuccess = resourceName => payload => {
  return {
    name: resourceName,
    type: UPDATE_RESOURCE_SUCCESS,
    payload,
  };
};

export const searchResource = resourceName => search => {
  return {
    name: resourceName,
    type: SEARCH_RESOURCE,
    payload: search,
  };
};

export const filterResource = resourceName => filter => {
  return {
    name: resourceName,
    type: FILTER_RESOURCE,
    payload: filter,
  };
};

const createResourceSuccess = resourceName => entity => {
  return {
    name: resourceName,
    type: CREATE_RESOURCE_SUCCESS,
    payload: entity,
  };
};

const createResourceError = resourceName => errors => {
  return {
    name: resourceName,
    type: CREATE_RESOURCE_ERROR,
    payload: errors,
  };
};

export const createResource = resourceName => ({ data, onSuccess, successMessage }) => {
  return {
    name: resourceName,
    type: CREATE_RESOURCE_REQUEST,
    payload: {
      data,
      onSuccess,
      successMessage,
    },
  };
};

export const clearResourceErrors = resourceName => () => {
  return {
    type: CLEAR_RESOURCE_ERRORS,
    name: resourceName,
  };
};

/**
 * Selectors
 */

export const resourceSelector = (state, id) => {
  return state.getIn(['entities', parseInt(id)]);
};

export const pageSelector = resourceName => state => state[resourceName].page;
export const paginationSelector = resourceName => state => state[resourceName].pagination;
export const searchSelector = resourceName => state => state[resourceName].search;
export const filterBySelector = resourceName => state => state[resourceName].filterBy;

export const entitiesSelector = resourceName => state =>
  state[resourceName].entities.valueSeq().toArray();

export const errorsSelector = errors => {
  return errors.toJS();
};

export const paramsToString = params => {
  return Object.entries(params)
    .filter(([key, value]) => !!value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const getFetchParams = (search, filterBy, page = START_PAGE) => {
  const params = {
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  };

  if (search.length > 0) {
    params.search = search;
  }

  const filterByObj = JSON.parse(filterBy);
  const countFilteredValues = Object.entries(filterByObj).length;

  if (countFilteredValues > 0) {
    params['filterBy[]'] = filterBy;
  }

  return params;
};

/**
 * Sagas
 */
export function* fetchResourcesSaga(action) {
  const resourceName = action.name;
  const page = START_PAGE;

  const search = yield select(searchSelector(resourceName));
  const filterBy = yield select(filterBySelector(resourceName));

  try {
    yield put({ name: resourceName, type: FETCH_RESOURCES_START });

    const responce = yield call(axios.get, `/api/v1/${resourceName}`, {
      params: getFetchParams(search, filterBy, page),
    });

    yield put({
      name: resourceName,
      type: FETCH_RESOURCES_SUCCESS,
      payload: { data: responce.data, total: responce.data.pagination.count },
    });
  } catch (error) {
    const { status } = error.response;
    const message = i18n.t('errors.resources.load');

    yield put({
      name: resourceName,
      type: FETCH_RESOURCES_ERROR,
    });

    displayHttpError(message, status);
  }
}

export function* refreshResourcesSaga(action) {
  const resourceName = action.name;

  const search = yield select(searchSelector(resourceName));
  const filterBy = yield select(filterBySelector(resourceName));

  try {
    yield put({ name: resourceName, type: REFRESH_RESOURCES_START });

    const responce = yield call(axios.get, `/api/v1/${resourceName}`, {
      params: getFetchParams(search, filterBy),
    });

    yield put({
      name: resourceName,
      type: REFRESH_RESOURCES_SUCCESS,
      payload: { data: responce.data, total: responce.data.pagination.count },
    });
  } catch (error) {
    const { status } = error.response;
    const message = i18n.t('errors.resources.load');

    yield put({
      name: resourceName,
      type: REFRESH_RESOURCES_ERROR,
    });

    displayHttpError(message, status);
  }
}

export function* loadMoreResourcesSaga(action) {
  const resourceName = action.name;
  const page = yield select(pageSelector(resourceName));
  const nextPage = page + 1;

  const search = yield select(searchSelector(resourceName));
  const filterBy = yield select(filterBySelector(resourceName));

  try {
    yield put({ name: resourceName, type: LOAD_MORE_RESOURCES_START, payload: nextPage });

    const responce = yield call(axios.get, `/api/v1/${resourceName}`, {
      params: getFetchParams(search, filterBy, page),
    });

    yield put({
      name: resourceName,
      type: LOAD_MORE_RESOURCES_SUCCESS,
      payload: { data: responce.data, total: responce.data.pagination.count },
    });
  } catch (error) {
    const { status } = error.response;
    const message = i18n.t('errors.resources.load');

    yield put({
      name: resourceName,
      type: LOAD_MORE_RESOURCES_ERROR,
    });

    displayHttpError(message, status);
  }
}

export function* fetchResourceSaga(action) {
  const resourceName = action.name;

  const { id, onSuccess } = action.payload;

  try {
    const responce = yield call(axios.get, `/api/v1/${resourceName}/${id}`);

    onSuccess(responce);

    yield put({
      name: resourceName,
      type: FETCH_RESOURCE_SUCCESS,
      payload: { data: responce.data },
    });
  } catch (error) {
    const { status } = error.response;
    const message = i18n.t('errors.resources.loadSingle');

    yield put({
      name: resourceName,
      type: FETCH_RESOURCE_ERROR,
    });

    displayHttpError(message, status);
  }
}

export function* addResourceSaga(action) {
  const { payload, name } = action;
  const { data, onSuccess, successMessage } = payload;
  console.log('function*addResourceSaga -> payload', payload);

  try {
    const response = yield call(axios.post, `/api/v1/${name}`, { ...data });

    yield put(createResourceSuccess(name)(response.data.data));

    showMessage({ type: 'success', message: successMessage });
    onSuccess();
  } catch (error) {
    const { status } = error.response;
    console.log('function*addResourceSaga -> error.response', error, error.response);

    if (status === 400) {
      yield put(createResourceError(name)(error.response.data.errors));
    } else {
      yield put(createResourceError(name)());

      const message = error.response?.data?.message ?? i18n.t('errors.resources.createError');
      displayHttpError(message, status);
    }
  }
}

export function* updateResourceSaga(action) {
  const resourceName = action.name;
  const { id, resourceData, onSuccess, successMessage } = action.payload;

  try {
    const response = yield call(axios.put, `/api/v1/${resourceName}/${id}`, resourceData);

    yield put(updateResourceSuccess(resourceName)({ data: response.data.data }));

    showMessage({ type: 'success', message: successMessage });
    onSuccess();
  } catch (error) {
    const { status } = error.response;

    if (status === 400) {
      yield put(updateResourceError(resourceName)(error.response.data.errors));
    } else {
      yield put(updateResourceError(resourceName)());

      const message = error.response?.data?.message ?? i18n.t('errors.resources.updateError');
      displayHttpError(message, status);
    }
  }
}

export function* searchResourceSaga(action) {
  const resourceName = action.name;

  yield put({
    name: resourceName,
    type: UPDATE_RESOURCES,
  });
}

export function* saga() {
  yield all([
    takeEvery(FETCH_RESOURCES_REQUEST, fetchResourcesSaga),
    takeEvery(REFRESH_RESOURCES_REQUEST, refreshResourcesSaga),
    takeEvery(LOAD_MORE_RESOURCES_REQUEST, loadMoreResourcesSaga),
    takeEvery(FETCH_RESOURCE_REQUEST, fetchResourceSaga),
    takeEvery(UPDATE_RESOURCES, fetchResourcesSaga),
    takeEvery(CREATE_RESOURCE_REQUEST, addResourceSaga),
    takeEvery(UPDATE_RESOURCE_REQUEST, updateResourceSaga),
    debounce(200, SEARCH_RESOURCE, searchResourceSaga),
  ]);
}
