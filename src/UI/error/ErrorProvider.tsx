import React, { ReactNode } from 'react';
import { ErrorContext } from './ErrorContext';

type ErrorProviderProps = {
  errors: any,
  children: ReactNode,
};

export const ErrorProvider: React.FC<ErrorProviderProps> = props => {
  const { errors, children } = props;

  return <ErrorContext.Provider value={errors}>{children}</ErrorContext.Provider>;
};
