import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableNativeFeedback, Platform, View } from 'react-native';

const AppTouchableFeedback = props => {
  const { children, style, ...restProps } = props;

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...restProps}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={style} {...restProps}>
      {children}
    </TouchableOpacity>
  );
};

AppTouchableFeedback.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.bool]))
  ])
};

export default AppTouchableFeedback;
