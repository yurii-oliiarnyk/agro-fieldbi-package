import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import { moduleName } from '../../../store/auth/auth';
import styles from './styles';
import { getRoleName } from './utils';
import AppList from '../../../components/AppList/AppList';
import Avatar from '../../../components/Avatar';

const Profile = props => {
  const { user } = props;

  const userData = [
    {
      name: i18n.t('user.name'),
      value: user.name,
      key: 'name'
    },
    {
      name: i18n.t('user.email'),
      value: user.email,
      key: 'email'
    },
    {
      name: i18n.t('user.roles'),
      value: getRoleName(user.roles[0]),
      key: 'roles'
    },
    {
      name: i18n.t('subdivision.multiple'),
      value:
        user.subdivisions.length > 0 ? (
          <>
            {user.subdivisions.map(subdivision => (
              <Text>{subdivision}</Text>
            ))}
          </>
        ) : null,
      key: 'subdivisions'
    }
  ];

  return (
    <ScrollView>
      <ImageBackground source={require('../../../assets/images/hero-bg.jpg')} style={styles.hero}>
        <View style={styles.heroOverlay}>
          <Avatar style={{ transform: [{ translateY: 50 }] }} />
        </View>
      </ImageBackground>
      <View style={{ padding: 16, paddingTop: 66 }}>
        <AppList data={userData} />
      </View>
    </ScrollView>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(state => {
  return {
    user: state[moduleName].user
  };
})(Profile);
