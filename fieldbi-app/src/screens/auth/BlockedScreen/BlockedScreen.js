import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Image from '../../../assets/svg/blocked-image.svg';
import AppButton from '../../../components/UI/AppButton';
import screens from '../../../navigation/screens';

const BlockedScreen = props => {
  const { navigation } = props;

  const imageAspectRatio = 0.62;
  const imageWidth = 320;
  const imageHeight = imageWidth * imageAspectRatio;

  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        padding: 32
      }}
      contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Image style={{ width: imageWidth, maxWidth: '100%', height: imageHeight }} />
      <Text style={styles.title}>{i18n.t('authorization.blockedUser.title')}</Text>
      <Text style={styles.description}>{i18n.t('authorization.blockedUser.description')}</Text>
      <AppButton type="outlined" onPress={() => navigation.navigate(screens.SignIn)}>
        {i18n.t('authorization.auth.signOut')}
      </AppButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 32,
    color: '#f64a4a',
    textAlign: 'center'
  },
  description: {
    marginBottom: 32,
    fontSize: 16,
    color: '#202030',
    textAlign: 'center'
  }
});

BlockedScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default BlockedScreen;
