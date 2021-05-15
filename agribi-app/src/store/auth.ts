import i18n from 'i18n-js';
import { createReducer, createAction } from '@reduxjs/toolkit';
import { eventChannel } from 'redux-saga';
import { all, takeEvery, call, put, take } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { axios, setupAuthInterceptors, TOKEN_KEY } from 'agro-package';

/**
 * types
 */
const SIGN_IN = 'SING_IN';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILED = 'GET_USER_FAILED';

const SIGN_OUT = 'SIGN_OUT';

/**
 * actions
 */
export type UserType = {
  id: number;
  email: string;
  name: string;
  roles: Array<string>;
};

type SignInActionType = {
  username: string;
  password: string;
};
export const signIn = createAction<SignInActionType>(SIGN_IN);

type SignInSuccessActionType = {
  token: string;
};
export const signInSuccess = createAction<SignInSuccessActionType>(SIGN_IN_SUCCESS);

export const signInFailed = createAction(SIGN_IN_FAILED);

export const getUser = createAction(GET_USER);

type GetUserSuccessActionType = {
  user: UserType;
};
export const getUserSuccess = createAction<GetUserSuccessActionType>(GET_USER_SUCCESS);

export const getUserFailed = createAction(GET_USER_FAILED);

export const signOut = createAction(SIGN_OUT);

/**
 * reducer
 */

const initState = {
  userLoading: false,
  user: undefined as UserType | undefined,
  signInLoading: false,
};

export const authReducer = createReducer(initState, {
  [signIn.type]: state => {
    state.signInLoading = true;
  },
  [signInSuccess.type]: state => {
    state.signInLoading = false;
  },
  [signInFailed.type]: state => {
    state.signInLoading = false;
  },
  [getUser.type]: state => {
    state.userLoading = true;
  },
  [getUserFailed.type]: state => {
    state.userLoading = false;
    state.user = undefined;
  },
  [getUserSuccess.type]: (state, action) => {
    state.userLoading = false;
    state.user = action.payload.user;
  },
  [signOut.type]: state => {
    state.user = undefined;
  },
});

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

type SingInSagaType = {
  type: typeof signIn;
  payload: SignInActionType;
};

export function* signInSaga(action: SingInSagaType) {
  const {
    payload: { password, username },
  } = action;

  try {
    const responce = yield call(axios.post, '/api/v1/auth/login', {
      password,
      username,
    });
    const { token } = responce.data;

    yield put(signInSuccess({ token }));
  } catch (error) {
    const { response } = error;
    const { status, statusText } = response;

    let errorDescription = `${status} - ${statusText}`;

    if (status === 401) {
      errorDescription = i18n.t('authorization.auth.badCredentials');
    }

    showMessage({
      description: errorDescription,
      message: i18n.t('errors.error'),
      type: 'danger',
    });

    yield put(signInFailed());
  }
}

type SingInSuccessSagaType = {
  type: typeof signInSuccess;
  payload: SignInSuccessActionType;
};

export function* signInSuccessSaga(action: SingInSuccessSagaType) {
  const {
    payload: { token },
  } = action;

  yield AsyncStorage.setItem(TOKEN_KEY, token);

  yield put(getUser());
}

export function* signOutSaga() {
  yield AsyncStorage.removeItem(TOKEN_KEY);
}

export function* getUserSaga() {
  const token = yield AsyncStorage.getItem(TOKEN_KEY);

  try {
    if (token) {
      const responce = yield call(axios.get, '/api/v1/auth/user');
      yield put(getUserSuccess({ user: responce.data.data }));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(getUserFailed());
  }
}

export function* saga() {
  yield all([
    watchUnauthSaga(),
    takeEvery(SIGN_IN, signInSaga),
    takeEvery(SIGN_IN_SUCCESS, signInSuccessSaga),
    takeEvery(SIGN_OUT, signOutSaga),
    takeEvery(GET_USER, getUserSaga),
  ]);
}
