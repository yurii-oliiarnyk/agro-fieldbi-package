import React, { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { showMessage } from 'react-native-flash-message';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Form, H1 } from 'native-base';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import DomainScreenInput from './DomainScreenInput';
import AppLoader from '../../../components/AppLoader';
import styles from './styles';
import AppButton from '../../../components/UI/AppButton';
import {
  DOMAIN_KEY,
  PLATFORM_PROTOCOL as PROTOCOL,
  PLATFORM_SUFFIX as SUFFIX
} from '../../../config';
import screens from '../../../navigation/screens';
import { getAPI } from '../../../store/auth/utils';
import { isValueValid } from './utils';
import LogoImage from '../../../assets/svg/logo.svg';

const DomainScreen = props => {
  const { navigation } = props;

  const inputRef = createRef();

  const [mode, setMode] = useState('show');
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');

  const getDomainFromStorage = async () => {
    const domain = await AsyncStorage.getItem(DOMAIN_KEY);

    if (isValueValid(domain)) {
      setValue(domain);
    } else {
      setMode('edit');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (mode === 'edit') {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [mode]);

  useEffect(() => {
    getDomainFromStorage();
  }, []);

  const onSubmitHandler = () => {
    const API = getAPI(value);

    setLoading(true);

    axios
      .get(`${API}/health_check/app`)
      .then(response => {
        const { status } = response;

        if (status === 'ok' || status === 200) {
          return AsyncStorage.setItem(DOMAIN_KEY, value);
        }

        throw new Error();
      })
      .then(() => navigation.navigate(screens.SignIn))
      .catch(() => {
        setLoading(false);

        showMessage({
          description: i18n.t('domain.error'),
          message: i18n.t('errors.error'),
          type: 'danger'
        });
      });
  };

  if (loading) {
    return <AppLoader />;
  }

  return (
    <Container style={{ flex: 1, backgroundColor: '#fff' }}>
      <Content
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-evenly', padding: 16 }}
      >
        <View style={styles.logo}>
          <LogoImage width={270} />
        </View>

        <Form>
          <H1 style={{ fontWeight: 'bold' }}>{i18n.t('domain.title')}</H1>

          <View
            style={{
              marginTop: 20,
              marginBottom: 8,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}
          >
            <View style={{ marginRight: 10 }}>
              <DomainScreenInput
                inputRef={inputRef}
                prefix={PROTOCOL}
                suffix={SUFFIX}
                placeholder="your-domain"
                value={value}
                disabled={mode !== 'edit'}
                setValue={setValue}
                onSubmitHandler={onSubmitHandler}
              />
            </View>
            {mode === 'show' && (
              <TouchableOpacity onPress={() => setMode('edit')}>
                <Text style={{ color: '#00A1FF', fontSize: 16, lineHeight: 26 }}>
                  {i18n.t('domain.change')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={{ fontSize: 14 }}>{i18n.t('domain.description')}</Text>

          <AppButton
            disabled={!isValueValid(value)}
            style={{ marginTop: 40 }}
            onPress={() => onSubmitHandler()}
          >
            {i18n.t('domain.next')}
          </AppButton>
        </Form>
      </Content>
    </Container>
  );
};

DomainScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default DomainScreen;
