import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddelware from 'redux-saga';
import rootSaga from './saga';
import { authReducer } from './auth';
import { createResoucesReducer } from 'agro-package/src/store';

import { FieldRecord } from './records/fieldRecord';
import { TaskOfScouting } from './records/taskOfScouting';
import { ScoutingReportRecord } from './records/scoutingReportsRecord';

const rootReducer = combineReducers({
  auth: authReducer,
  fields: createResoucesReducer('fields', FieldRecord),
  'agro/task-of-scout': createResoucesReducer('agro/task-of-scout', TaskOfScouting),
  'agro/scouting-reports': createResoucesReducer('agro/scouting-reports', ScoutingReportRecord),
});

const sagaMiddleware = createSagaMiddelware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
