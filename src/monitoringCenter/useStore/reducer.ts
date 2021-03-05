import { FieldType, LandType, isCoordinatesValid } from '../../mapbox/geoJSONutils';

export const FETCH_FIELDS_REQUEST = 'FETCH_FIELDS_REQUEST';
export const FETCH_FIELDS_SUCCESS = 'FETCH_FIELDS_SUCCESS';
export const FETCH_FIELDS_ERROR = 'FETCH_FIELDS_ERROR';

export const FETCH_LANDS_REQUEST = 'FETCH_LANDS_REQUEST';
export const FETCH_LANDS_SUCCESS = 'FETCH_LANDS_SUCCESS';
export const FETCH_LANDS_ERROR = 'FETCH_LANDS_ERROR';

export const initState = {
  // fields
  fields: [] as FieldType[],
  fieldsLoading: false,
  fieldsLoaded: false,
  // lands
  lands: [] as LandType[],
  landsLoading: false,
  landsLoaded: false,
};

export type StateType = typeof initState;

type ReducerActionType =
  | FetchFieldsSuccessActionReturnType
  | FetchFieldsErrorActionReturnType
  | FetchFieldsActionReturnType
  | FetchLandsSuccessActionReturnType
  | FetchLandsErrorActionReturnType
  | FetchLandsActionReturnType;

export const reducer = (state: StateType, action: ReducerActionType): StateType => {
  switch (action.type) {
    case FETCH_FIELDS_REQUEST:
      return {
        ...state,
        fieldsLoading: true,
      };

    case FETCH_FIELDS_ERROR:
      return {
        ...state,
        fieldsLoading: false,
      };

    case FETCH_FIELDS_SUCCESS:
      const {
        payload: { fields },
      } = action;

      return {
        ...state,
        fieldsLoading: false,
        fieldsLoaded: true,
        fields: fields.filter((field: FieldType) => isCoordinatesValid(field.coordinates)),
      };

    case FETCH_LANDS_REQUEST:
      return {
        ...state,
        landsLoading: true,
      };

    case FETCH_LANDS_ERROR:
      return {
        ...state,
        landsLoading: false,
      };

    case FETCH_LANDS_SUCCESS:
      const {
        payload: { lands },
      } = action;

      return {
        ...state,
        landsLoading: false,
        landsLoaded: true,
        lands: lands.filter((land: LandType) => isCoordinatesValid(land.coordinates)),
      };

    default:
      return state;
  }
};

type MonitoringCenterState = ReturnType<typeof reducer>;

/**
 * Action creators
 */

type FetchFieldsSuccessActionReturnType = {
  type: typeof FETCH_FIELDS_SUCCESS;
  payload: {
    fields: FieldType[];
  };
};

export const fetchFieldsSuccessAction = (
  fields: FieldType[]
): FetchFieldsSuccessActionReturnType => {
  return {
    type: FETCH_FIELDS_SUCCESS,
    payload: {
      fields,
    },
  };
};

type FetchFieldsErrorActionReturnType = {
  type: typeof FETCH_FIELDS_ERROR;
};

export const fetchFieldsErrorAction = (): FetchFieldsErrorActionReturnType => {
  return {
    type: FETCH_FIELDS_ERROR,
  };
};

type FetchFieldsActionReturnType = {
  type: typeof FETCH_FIELDS_REQUEST;
};

export const fetchFieldsAction = (): FetchFieldsActionReturnType => {
  return {
    type: FETCH_FIELDS_REQUEST,
  };
};

type FetchLandsSuccessActionReturnType = {
  type: typeof FETCH_LANDS_SUCCESS;
  payload: {
    lands: LandType[];
  };
};

export const fetchLandsSuccessAction = (lands: LandType[]): FetchLandsSuccessActionReturnType => {
  return {
    type: FETCH_LANDS_SUCCESS,
    payload: {
      lands,
    },
  };
};

type FetchLandsErrorActionReturnType = {
  type: typeof FETCH_LANDS_ERROR;
};

export const fetchLandsErrorAction = (): FetchLandsErrorActionReturnType => {
  return {
    type: FETCH_LANDS_ERROR,
  };
};

type FetchLandsActionReturnType = {
  type: typeof FETCH_LANDS_REQUEST;
};

export const fetchLandsAction = (): FetchLandsActionReturnType => {
  return {
    type: FETCH_LANDS_REQUEST,
  };
};

/**
 * selectors
 */

export const fieldsSelector = (state: MonitoringCenterState): FieldType[] => state.fields;
export const landsSelector = (state: MonitoringCenterState): LandType[] => state.lands;
