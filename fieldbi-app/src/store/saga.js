import { all } from 'redux-saga/effects';
import { saga as authSaga } from './auth/auth';
import { saga as monitoringSaga } from './monitoring/monitoring';
import { saga as resourceSaga } from './resource/resource';

export default function* rootSaga() {
  yield all([authSaga(), monitoringSaga(), resourceSaga()]);
}
