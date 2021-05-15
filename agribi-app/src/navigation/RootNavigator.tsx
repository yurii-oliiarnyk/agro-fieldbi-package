import React from 'react';
import { useSelector } from 'react-redux';
import { AuthorizedNavigator } from './AuthorizedNavigator';
import { UnauthorizedNavigator } from './UnauthorizedNavigator';

import { RootState } from '../store';

export const RootNavigator = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <AuthorizedNavigator />;
  }

  return <UnauthorizedNavigator />;
};
