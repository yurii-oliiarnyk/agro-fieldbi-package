import i18n from 'i18n-js';
import { useReducer, useCallback, useMemo } from 'react';
import axios from '../../axios';

import {
  reducer,
  initState,
  fetchFieldsAction,
  fetchFieldsErrorAction,
  fetchFieldsSuccessAction,
  fetchLandsAction,
  fetchLandsErrorAction,
  fetchLandsSuccessAction,
  fieldsSelector,
  landsSelector,
  StateType,
} from './reducer';

export const useMonitoringCenterStore = (): StateType & {
  loadFields: () => void;
  loadLands: () => void;
} => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { fieldsLoading, fieldsLoaded, landsLoading, landsLoaded } = state;

  const fetchFields = useCallback(() => dispatch(fetchFieldsAction()), [dispatch]);
  const fetchFieldsSuccess = useCallback(fields => dispatch(fetchFieldsSuccessAction(fields)), [
    dispatch,
  ]);
  const fetchFieldsError = useCallback(() => dispatch(fetchFieldsErrorAction()), [dispatch]);
  const fetchLands = useCallback(() => dispatch(fetchLandsAction()), [dispatch]);
  const fetchLandsSuccess = useCallback(lands => dispatch(fetchLandsSuccessAction(lands)), [
    dispatch,
  ]);
  const fetchLandsError = useCallback(() => dispatch(fetchLandsErrorAction()), [dispatch]);

  const fields = useMemo(() => fieldsSelector(state), [state]);
  const lands = useMemo(() => landsSelector(state), [state]);

  const loadFields = useCallback(() => {
    fetchFields();

    axios
      .get('/api/v1/monitoring/fields', {
        params: {
          epsilon: 0.0001,
        },
      })
      .then(response => response.data.data)
      .then(fields => fetchFieldsSuccess(fields))
      .catch(error => {
        fetchFieldsError();

        //     const { status } = error.response;
        //     const message = i18n.t('errors.monitoring.fieldLoad');
        //     displayHttpError(message, status);
      });
  }, [fetchFields, fetchFieldsSuccess, fetchFieldsError]);

  const loadLands = useCallback(() => {
    fetchLands();

    axios
      .get('/api/v1/monitoring/lands', {
        params: {
          epsilon: 0.0001,
        },
      })
      .then(response => response.data.data)
      .then(lands => fetchLandsSuccess(lands))
      .catch(error => {
        fetchLandsError();

        // const { status } = error.response;
        // const message = i18n.t('errors.monitoring.fieldLoad');
        // displayHttpError(message, status);
      });
  }, [fetchLands, fetchLandsSuccess, fetchLandsError]);

  return {
    fieldsLoading,
    fieldsLoaded,
    fields,
    landsLoading,
    landsLoaded,
    lands,
    loadFields,
    loadLands,
  };
};
