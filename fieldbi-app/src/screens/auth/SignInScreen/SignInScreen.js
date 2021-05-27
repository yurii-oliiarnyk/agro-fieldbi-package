import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { showMessage } from 'react-native-flash-message';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { moduleName, signIn, getUser } from '../../../store/auth/auth';
import styles from './styles';
import AppLoader from '../../../components/AppLoader';
import AppButton from '../../../components/UI/AppButton';
import { COLORS, VARIABLES } from '../../../constants';
import screens from '../../../navigation/screens';
import LogoImage from '../../../assets/svg/logo.svg';

const AuthorizationScreen = props => {
  const { signIn, loading, navigation, getUser, error } = props;
  const passwordRef = useRef(null);

  const [checkedUser, setCheckedUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmitHandler = () => {
    signIn(username, password);
  };

  const changeDomainHandler = () => {
    navigation.navigate(screens.Domain);
  };

  useEffect(() => {
    getUser();
    setCheckedUser(true);
  }, []);

  useEffect(() => {
    if (error) {
      const code = error?.data?.code ?? error.status;
      const message = error?.data?.message ?? error.statusText;

      if (message === 'USER_BLOCKED') {
        navigation.navigate(screens.UserBlocked);

        return;
      }

      let errorDescription = `${code} - ${message}`;

      if (code === 401) {
        errorDescription = i18n.t('authorization.auth.badCredentials');
      }

      showMessage({
        description: errorDescription,
        message: i18n.t('errors.error'),
        type: 'danger'
      });
    }
  }, [error]);

  if (!checkedUser || loading) {
    return <AppLoader />;
  }

  return (
    <ScrollView
      style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}
      contentContainerStyle={{ justifyContent: 'space-evenly', flex: 1 }}
    >
      <View style={styles.logo}>
        <LogoImage width={270} />
      </View>

      <View>
        <View>
          <Text style={styles.title}>{i18n.t('authorization.auth.signIn')}</Text>
          <View>
            <View style={styles.iconLeft}>
              <MaterialCommunityIcons name="email-outline" {...VARIABLES.inputIcon} />
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.GREY}
              placeholder={i18n.t('authorization.auth.emailPlaceholder')}
              value={username}
              onChangeText={setUsername}
              textContentType="emailAddress"
              autoCompleteType="email"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
            />
          </View>
          <View style={{ marginTop: 8 }}>
            <View style={styles.iconLeft}>
              <MaterialCommunityIcons name="lock-outline" {...VARIABLES.inputIcon} />
            </View>
            <TextInput
              style={[styles.input, { paddingRight: 35 }]}
              placeholderTextColor={COLORS.GREY}
              ref={passwordRef}
              value={password}
              onChangeText={setPassword}
              placeholder={i18n.t('authorization.auth.passwordPlaceholder')}
              textContentType="password"
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry={!passwordVisible}
              onSubmitEditing={() => onSubmitHandler()}
              blurOnSubmit={false}
            />
            {!!password && (
              <TouchableOpacity
                style={styles.iconRight}
                activeOpacity={0.5}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <MaterialCommunityIcons
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                  {...VARIABLES.inputIcon}
                />
              </TouchableOpacity>
            )}
          </View>
          <AppButton style={{ marginTop: 16 }} onPress={() => onSubmitHandler()}>
            {i18n.t('authorization.auth.signIn')}
          </AppButton>
        </View>
        <View style={{ marginTop: 16 }}>
          <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={{ fontSize: 12, color: COLORS.GREY }}>або</Text>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 6 }}>
            <TouchableOpacity activeOpacity={0.6} onPress={changeDomainHandler}>
              <Text style={{ fontSize: 16, color: COLORS.MAIN }}>Змінити робочий простір</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

AuthorizationScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  // from connect
  signIn: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  state => {
    const loading = state[moduleName].signInLoading || state[moduleName].userLoading;
    const error = state[moduleName].signInError;

    return {
      loading,
      error
    };
  },
  { signIn, getUser }
)(AuthorizationScreen);
