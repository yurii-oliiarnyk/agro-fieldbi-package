import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TopControlsWrapperTypes = {
  children: ReactNode;
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    padding: 16,
    right: 0,
    top: 0,
    zIndex: 10,
    alignItems: 'flex-end',
  },
});

export const TopControlsWrapper: React.FC<TopControlsWrapperTypes> = (props): JSX.Element => {
  const { children } = props;

  const headerHeight = 48;
  const { top: statusBarHeight } = useSafeAreaInsets();

  const paddingTop = (statusBarHeight > 16 ? statusBarHeight : 16) + headerHeight + 16;

  return (
    <View
      style={[
        styles.view,
        {
          paddingTop,
        },
      ]}
    >
      {children}
    </View>
  );
};
