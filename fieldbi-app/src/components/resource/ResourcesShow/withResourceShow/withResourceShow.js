import React from 'react';
import ResourceShow from '../ResourceShow';

const withResourceShow = (WrappedComponent, screenParams) => {
  return props => {
    return (
      <ResourceShow {...props} screenParams={screenParams}>
        {resourceProps => <WrappedComponent {...resourceProps} {...props} />}
      </ResourceShow>
    );
  };
};

export default withResourceShow;
