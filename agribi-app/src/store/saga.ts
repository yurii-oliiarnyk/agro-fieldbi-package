import { all } from 'redux-saga/effects';
import { saga as authSaga } from './auth';
import { saga as resourceSaga } from 'agro-package/src/store/resources';

export default function* rootSaga() {
  yield all([authSaga(), resourceSaga()]);
}
