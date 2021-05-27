import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthorizedNavigator from './AuthorizedNavigator';
import UnauthorizedNavigator from './UnauthorizedNavigator';

import { moduleName } from '../store/auth/auth';

const RootNavigator = props => {
  const { user } = props;

  if (user) {
    return <AuthorizedNavigator />;
  }

  return <UnauthorizedNavigator />;
};

RootNavigator.propTypes = {
  user: PropTypes.object
};

export default connect(state => {
  return {
    user: state[moduleName].user
  };
})(RootNavigator);
