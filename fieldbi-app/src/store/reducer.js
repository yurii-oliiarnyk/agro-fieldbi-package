import { combineReducers } from 'redux';
import authReducer, { moduleName as auth } from './auth/auth';
import monitoringReducer, { moduleName as monitoring } from './monitoring/monitoring';
import recourcesReducer, { createResoucesReducer } from './resource/resource';
import FieldRecord from './records/fieldRecord';
import LandRecord from './records/landRecord';
import AgreementRecord from './records/agreementRecord';
import CounterpartyRecord from './records/counterpartyRecord';
import TaskRecord from './records/taskRecord';

const rootReducer = combineReducers({
  [auth]: authReducer,
  [monitoring]: monitoringReducer,
  // resources
  fields: createResoucesReducer(recourcesReducer, 'fields', FieldRecord),
  lands: createResoucesReducer(recourcesReducer, 'lands', LandRecord),
  agreements: createResoucesReducer(recourcesReducer, 'agreements', AgreementRecord),
  'dictionary/counterparties': createResoucesReducer(
    recourcesReducer,
    'dictionary/counterparties',
    CounterpartyRecord
  ),
  tasks: createResoucesReducer(recourcesReducer, 'tasks', TaskRecord)
});

export default rootReducer;
