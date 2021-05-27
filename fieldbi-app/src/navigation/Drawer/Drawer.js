import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSafeArea } from 'react-native-safe-area-context';
import { DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, ImageBackground, View, Text } from 'react-native';
import { moduleName, signOut } from '../../store/auth/auth';
import { COLORS } from '../../constants';
import Avatar from '../../components/Avatar/Avatar';

const Drawer = props => {
  const { user, signOut } = props;
  const insets = useSafeArea();

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        paddingTop: 0,
        paddingBottom: insets.bottom,
        flexGrow: 1,
        justifyContent: 'space-between'
      }}
    >
      <View>
        <ImageBackground style={styles.heroBg} source={require('../../assets/images/hero-bg.jpg')}>
          <View style={styles.heroOverlay}>
            {user && (
              <View style={styles.userInfo}>
                <Avatar style={styles.userAvatar} />
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            )}
          </View>
        </ImageBackground>
        <DrawerItemList {...props} inactiveTintColor={COLORS.BLACK} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heroBg: {
    height: 200,
    width: '100%'
  },
  heroOverlay: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  userInfo: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  userAvatar: {
    width: 60,
    height: 60
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 16
  }
});

Drawer.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired
};

export default connect(
  state => {
    return {
      user: state[moduleName].user
    };
  },
  {
    signOut
  }
)(Drawer);
