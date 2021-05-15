import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLinkTo } from '@react-navigation/native';
import {
  Button,
  Typography,
  DomainInput,
  DOMAIN_KEY,
  PLATFORM_PROTOCOL,
  PLATFORM_SUFFIX,
} from 'agro-package';
import { showMessage } from 'react-native-flash-message';
import { AuthorizationView } from '../components/authhorization/AuthorizationView';

const styles = StyleSheet.create({
  inputWrap: {
    marginTop: 20,
    marginBottom: 8,
  },
  inputHelp: {
    fontSize: 14,
    color: '#606060',
  },
  buttonWrap: {
    marginTop: 40,
  },
});

export const DomainScreen: React.FC = (): JSX.Element => {
  const linkTo = useLinkTo();

  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);

  const getSavedDomain = useCallback(async () => {
    const storageDomain = await AsyncStorage.getItem(DOMAIN_KEY);

    setDomain(storageDomain ?? '');
  }, []);

  const onSubmitHandler = useCallback(async () => {
    const URL = `${PLATFORM_PROTOCOL}${domain}${PLATFORM_SUFFIX}`;

    try {
      setLoading(true);
      await AsyncStorage.setItem(DOMAIN_KEY, domain);

      const { status } = await axios.get(`${URL}/health_check/app`);

      if (status === 200) {
        return linkTo('/Login');
      }

      throw new Error();
    } catch (e) {
      showMessage({
        message: i18n.t('errors.error'),
        description: i18n.t('authorization.instance.notValid'),
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  }, [domain, linkTo]);

  useEffect(() => {
    getSavedDomain();
  }, [getSavedDomain]);

  return (
    <AuthorizationView>
      <Typography.H1>{i18n.t('authorization.instance.title')}</Typography.H1>
      <View style={styles.inputWrap}>
        <DomainInput
          value={domain}
          setValue={setDomain}
          onSubmitHandler={onSubmitHandler}
          prefix={PLATFORM_PROTOCOL}
          suffix={PLATFORM_SUFFIX}
        />
      </View>
      <Typography style={styles.inputHelp}>{i18n.t('authorization.instance.help')}</Typography>
      <View style={styles.buttonWrap}>
        <Button onPress={onSubmitHandler} disabled={!domain} loading={loading}>
          {i18n.t('authorization.instance.submit')}
        </Button>
      </View>
    </AuthorizationView>
  );
};
