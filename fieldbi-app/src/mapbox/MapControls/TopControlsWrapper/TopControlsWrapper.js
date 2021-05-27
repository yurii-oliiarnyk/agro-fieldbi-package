import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

const TopControlsWrapper = props => {
  const { children } = props;

  const headerHeight = 48;
  const { top: statusBarHeight } = useSafeArea();

  const paddingTop = (statusBarHeight > 16 ? statusBarHeight : 16) + headerHeight + 16;

  return (
    <View
      style={{
        position: 'absolute',
        padding: 16,
        paddingTop,
        right: 0,
        top: 0,
        zIndex: 10,
        alignItems: 'flex-end'
      }}
    >
      {children}
    </View>
  );
};

TopControlsWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default TopControlsWrapper;
