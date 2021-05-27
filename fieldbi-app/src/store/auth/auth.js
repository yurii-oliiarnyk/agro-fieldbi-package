import { Record } from 'immutable';
import { eventChannel } from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { all, takeEvery, call, put, take } from 'redux-saga/effects';

import axios from '../../axios/axios';
import setupAuthInterceptors from '../../axios/auth-interceptors';
import { TOKEN_KEY } from '../../config';

export const moduleName = 'auth';
const prefix = `${moduleName} / `;

export const SIGN_IN = `${prefix}SIGN_IN`;
export const SIGN_IN_SUCCESS = `${prefix}SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}SIGN_IN_ERROR`;

export const SIGN_OUT = `${prefix}SIGN_OUT`;
export const SIGN_OUT_SUCCESS = `${prefix}SIGN_OUT_SUCCESS`;

export const GET_USER = `${prefix}GET_USER`;
export const GET_USER_SUCCESS = `${prefix}GET_USER_SUCCESS`;
export const GET_USER_ERROR = `${prefix}GET_USER_ERROR`;

export const ReducerRecord = Record({
  userError: false,
  userLoading: false,
  user: null,
  signInError: null,
  signInLoading: false
});

const initialState = new ReducerRecord();

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN: {
      return state.set('signInLoading', true);
    }

    case SIGN_IN_SUCCESS: {
      return state.set('signInLoading', false);
    }

    case SIGN_IN_ERROR: {
      return state.set('signInLoading', false).set('signInError', payload);
    }

    case SIGN_OUT_SUCCESS:
      return state.set('user', null);

    case GET_USER: {
      return state.set('userLoading', true).set('userError', false);
    }

    case GET_USER_SUCCESS:
      return state
        .set('user', payload)
        .set('userLoading', false)
        .set('userError', false);

    case GET_USER_ERROR:
      return state
        .set('userError', true)
        .set('userLoading', false)
        .set('user', null);

    default:
      return state;
  }
}

/**
 * Action creators
 */
export const getUser = () => {
  return {
    type: GET_USER
  };
};

export const getUserSuccess = user => {
  return {
    type: GET_USER_SUCCESS,
    payload: user
  };
};

export const signIn = (username, password) => {
  return {
    type: SIGN_IN,
    payload: { username, password }
  };
};

export const signInSuccess = token => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: token
  };
};

export const signInError = error => {
  return { type: SIGN_IN_ERROR, payload: error };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const getUserError = () => {
  return {
    type: GET_USER_ERROR
  };
};

export const signOutSuccess = () => {
  return { type: SIGN_OUT_SUCCESS };
};

/**
 * Sagas
 */

function createUnauthChanell() {
  return eventChannel(emitter => {
    setupAuthInterceptors(status => {
      emitter(status);
    });

    return () => {};
  });
}

export function* watchUnauthSaga() {
  const channel = yield call(createUnauthChanell);

  while (channel) {
    const status = yield take(channel);

    if (status === 401) {
      yield put(signOut());
    }
  }
}

export function* signInSaga(action) {
  const { payload } = action;

  try {
    const responce = yield call(axios.post, '/api/v1/auth/login', {
      ...payload
    });
    const { token } = responce.data;

    yield put(signInSuccess(token));
  } catch (error) {
    const { response } = error;

    yield put(signInError(response));
  }
}

export function* signInSuccessSaga(action) {
  const { payload } = action;

  yield AsyncStorage.setItem(TOKEN_KEY, payload);

  yield put(getUser());
}

export function* signOutSaga() {
  yield AsyncStorage.removeItem(TOKEN_KEY);

  yield put(signOutSuccess());
}

export function* getUserSaga() {
  const token = yield AsyncStorage.getItem(TOKEN_KEY);

  try {
    if (token) {
      const responce = yield call(axios.get, '/api/v1/auth/user');
      yield put(getUserSuccess(responce.data.data));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(getUserError());
  }
}

export function* saga() {
  yield all([
    watchUnauthSaga(),
    takeEvery(SIGN_IN, signInSaga),
    takeEvery(SIGN_OUT, signOutSaga),
    takeEvery(GET_USER, getUserSaga),
    takeEvery(SIGN_IN_SUCCESS, signInSuccessSaga)
  ]);
}
