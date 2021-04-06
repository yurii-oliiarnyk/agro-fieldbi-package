import React, { ReactNode, useEffect, useState } from 'react';
import { Loader } from '../../UI/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  updateResource,
  errorsSelector,
  clearResourceErrors,
  resourceSelector,
  fetchResource,
} from '../../store/resources';

export type ChildrenPropsType = {
  submit: (submitValues: { resourceData: any; onSuccess: () => void }) => void;
  submitting: boolean;
  errors: any;
  clearErrors: () => void;
  labels: {
    submitting: string;
    success: string;
  };
  id: number;
  entity: any;
  name: string;
};

type ResourceEditProviderProps = {
  name: string;
  labels: {
    submitting: string;
    success: string;
  };
  children: (props: ChildrenPropsType) => ReactNode;
  loadFullEntity?: boolean;
};

type ResourceEditContainerProps = {
  // from connect
  updateResource: (values: any) => void;
  fetchResource: (id: number, onSuccess: (response: any) => void) => void;
  updateResourceSubmitting: boolean;
  clearResourceErrors: () => void;
  errors: any;
  id: number;
  entity: any;
} & ResourceEditProviderProps;

export const ResourceEditContainer: React.FC<ResourceEditContainerProps> = props => {
  const {
    children,
    updateResource: submit,
    updateResourceSubmitting: submitting,
    clearResourceErrors: clearErrors,
    errors,
    labels,
    id,
    entity,
    fetchResource,
    loadFullEntity,
    name,
  } = props;

  const [fullEntity, setFullEntity] = useState(null);

  useEffect(() => {
    if (!entity || loadFullEntity) {
      fetchResource(id, response => {
        setFullEntity(response.data.data);
      });
    }
  }, [id]);

  if ((!loadFullEntity && !entity) || (loadFullEntity && !fullEntity)) {
    return <Loader />;
  }

  return <>{children({ clearErrors, errors, submit, submitting, labels, id, entity, name })}</>;
};

export const ResourceEditProvider: React.FC<ResourceEditProviderProps> = connect(
  (state, { name, route }) => {
    const id = route?.params?.entitieId;

    return {
      updateResourceSubmitting: state[name].updateResourceSubmitting,
      errors: errorsSelector(state[name].updateResourceErrors),
      id,
      entity: resourceSelector(state[name], id),
    };
  },
  (dispatch, { name }) => {
    const boundActions = bindActionCreators(
      {
        updateResource: updateResource(name),
        clearResourceErrors: clearResourceErrors(name),
        fetchResource: fetchResource(name),
      },
      dispatch
    );

    return { ...boundActions };
  }
)(ResourceEditContainer);
