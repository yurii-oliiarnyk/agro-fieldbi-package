import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createResource, errorsSelector, clearResourceErrors } from '../../store/resources';

export type ChildrenPropsType = {
  submit: (submitValues: { values: any; onSuccess: () => void }) => void;
  submitting: boolean;
  errors: any;
  clearErrors: () => void;
  labels: {
    submitting: string;
    success: string;
  };
};

type ResourceCreateProviderProps = {
  name: string;
  labels: {
    submitting: string;
    success: string;
  };
  children: (props: ChildrenPropsType) => ReactNode;
};

type ResourceCreateContainerProps = {
  // from connect
  createResource: (values: any) => void;
  createResourceSubmitting: boolean;
  clearResourceErrors: () => void;
  errors: any;
} & ResourceCreateProviderProps;

export const ResourceCreateContainer: React.FC<ResourceCreateContainerProps> = props => {
  const {
    children,
    createResource: submit,
    createResourceSubmitting: submitting,
    clearResourceErrors: clearErrors,
    errors,
    labels,
  } = props;

  return <>{children({ clearErrors, errors, submit, submitting, labels })}</>;
};

export const ResourceCreateProvider: React.FC<ResourceCreateProviderProps> = connect(
  (state, { name }) => {
    return {
      createResourceSubmitting: state[name].createResourceSubmitting,
      errors: errorsSelector(state[name].createResourceErrors),
    };
  },
  (dispatch, { name }) => {
    const boundActions = bindActionCreators(
      {
        createResource: createResource(name),
        clearResourceErrors: clearResourceErrors(name),
      },
      dispatch
    );

    return { ...boundActions };
  }
)(ResourceCreateContainer);
