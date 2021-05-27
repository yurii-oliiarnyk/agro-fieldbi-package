import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import { useLinkTo } from '@react-navigation/native';
import { Typography, Button, Link } from 'agro-package';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthorizationView } from '../components/authhorization/AuthorizationView';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/auth';
import { RootState } from '../store';

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 8,
  },
  domainButton: {
    marginTop: 4,
  },
  input: {
    paddingLeft: 35,
    fontSize: 18,
    height: 48,
    color: '#202030',
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  iconLeft: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
  },
  iconRight: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
  },
});

const iconStyles = {
  size: 24,
  color: '#606060',
};

export const LoginScreen = (): JSX.Element => {
  const passwordRef = useRef<TextInput>(null);
  const linkTo = useLinkTo();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const signInLoading = useSelector(
    (state: RootState) => state.auth.signInLoading || state.auth.userLoading
  );

  const dispatch = useDispatch();

  const domainChange = () => {
    linkTo('/Domain');
  };

  const onEmailSubmit = useCallback(() => {
    passwordRef.current?.focus();
  }, [passwordRef]);

  const onSubmitHandler = () => {
    dispatch(signIn({ password, username }));
  };

  return (
    <AuthorizationView>
      <Typography.H1>{i18n.t('authorization.auth.signIn')}</Typography.H1>
      <View style={{ marginVertical: 8 }}>
        <View style={styles.iconLeft}>
          <MaterialCommunityIcons name="email-outline" {...iconStyles} />
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor="#909090"
          placeholder={i18n.t('authorization.auth.emailPlaceholder')}
          value={username}
          onChangeText={setUsername}
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          autoFocus
          onSubmitEditing={onEmailSubmit}
        />
      </View>
      <View>
        <View style={styles.iconLeft}>
          <MaterialCommunityIcons name="lock-outline" {...iconStyles} />
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor="#909090"
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          placeholder={i18n.t('authorization.auth.passwordPlaceholder')}
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          secureTextEntry={!passwordVisible}
          onSubmitEditing={onSubmitHandler}
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
              {...iconStyles}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 24 }}>
        <Button onPress={onSubmitHandler} loading={signInLoading}>
          {i18n.t('authorization.auth.signIn')}
        </Button>
      </View>
      <View style={styles.buttonWrapper}>
        <Typography>або</Typography>
        <View style={styles.domainButton}>
          <Link onPress={domainChange}>{i18n.t('authorization.instance.change')}</Link>
        </View>
      </View>
    </AuthorizationView>
  );
};
