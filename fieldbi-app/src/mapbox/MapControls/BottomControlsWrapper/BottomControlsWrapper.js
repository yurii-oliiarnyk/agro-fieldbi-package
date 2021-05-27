import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

const BottomControlsWrapper = props => {
  const { children, visible } = props;

  const transformAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const toValue = visible ? 1 : 0;

    Animated.timing(transformAnim, {
      toValue,
      duration: 100
    }).start();
  }, [visible]);

  const inserts = useSafeArea();

  return (
    <Animated.View
      style={{
        position: 'absolute',
        padding: 16,
        paddingBottom: inserts.bottom > 16 ? inserts.bottom : 16,
        width: '100%',
        right: 0,
        bottom: 0,
        zIndex: 1,
        alignItems: 'flex-end',
        opacity: transformAnim
      }}
    >
      {children}
    </Animated.View>
  );
};

BottomControlsWrapper.defaultProps = {
  visible: true
};

BottomControlsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool
};

export default BottomControlsWrapper;
