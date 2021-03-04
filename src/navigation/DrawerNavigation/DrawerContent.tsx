import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { UserType } from '../../types';
import { Avatar } from '../../UI/Avatar';
import { COLORS } from '../../colors';

const styles = StyleSheet.create({
  drawerView: {
    paddingTop: 0,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  heroBg: {
    height: 200,
    width: '100%',
  },
  heroOverlay: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  userInfo: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 16,
  },
});

type DrawerContentTypes = {
  user?: UserType;
  signOut: () => void;
};

export const DrawerContent: React.FC<
  DrawerContentTypes & React.ComponentProps<typeof DrawerItemList>
> = (props): JSX.Element => {
  const { user, signOut, ...restProps } = props;
  const insets = useSafeAreaInsets();

  return (
    <DrawerContentScrollView
      contentContainerStyle={[
        styles.drawerView,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View>
        <ImageBackground style={styles.heroBg} source={require('../../assets/hero-bg.jpg')}>
          <View style={styles.heroOverlay}>
            {user && (
              <View style={styles.userInfo}>
                <Avatar style={styles.userAvatar} />
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            )}
          </View>
        </ImageBackground>
        <DrawerItemList {...restProps} inactiveTintColor={COLORS.BLACK} />
      </View>
      <DrawerItem
        {...props}
        icon={({ color, size }) => <Icon name="logout" color={color} size={size} />}
        label="Вийти"
        onPress={() => signOut()}
      />
    </DrawerContentScrollView>
  );
};
