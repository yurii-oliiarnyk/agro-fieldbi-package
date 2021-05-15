import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions, SafeAreaView } from 'react-native';
import LogoImg from '../../assets/logo.svg';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 160,
  },
  logo: {
    width: 205,
    alignItems: 'center',
  },
  formView: {
    padding: 16,
    paddingBottom: 32,
    maxWidth: 500,
    width: '100%',
  },
});

type AuthorizationViewProps = {
  children: ReactNode;
};

export const AuthorizationView: React.FC<AuthorizationViewProps> = (props): JSX.Element => {
  const { children } = props;

  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <View style={styles.bodyWrap}>
          <View style={[styles.logoView, { height: height / 3 }]}>
            <LogoImg width={270} />
          </View>
          <View style={styles.formView}>{children}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
