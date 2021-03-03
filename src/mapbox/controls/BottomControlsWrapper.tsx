import React, { useEffect, useRef, ReactNode } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomControlsWrapperTypes = {
  children: ReactNode;
  visible: boolean;
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    padding: 16,
    width: '100%',
    right: 0,
    bottom: 0,
    zIndex: 1,
    alignItems: 'flex-end',
  },
});

export const BottomControlsWrapper: React.FC<BottomControlsWrapperTypes> = (props): JSX.Element => {
  const { children, visible = true } = props;

  const transformAnim = useRef(new Animated.Value(1)).current;
  const inserts = useSafeAreaInsets();

  useEffect(() => {
    const toValue = visible ? 1 : 0;

    Animated.timing(transformAnim, {
      toValue,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [visible, transformAnim]);

  const viewAddStyles = {
    paddingBottom: inserts.bottom > 16 ? inserts.bottom : 16,
    opacity: transformAnim,
  };

  return <Animated.View style={[styles.view, viewAddStyles]}>{children}</Animated.View>;
};
