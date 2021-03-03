import React from 'react';
import { View, Image, StyleSheet, Platform, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    height: '100%',
    width: '100%',
  },
  avatarView: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
});

type AvatarProps = {
  style: ViewStyle;
};

export const Avatar: React.FC<AvatarProps> = (props): JSX.Element => {
  const { style } = props;

  return (
    <View style={[styles.avatarView, style]}>
      <Image source={require('../assets/default_user.png')} style={styles.avatar} />
    </View>
  );
};
