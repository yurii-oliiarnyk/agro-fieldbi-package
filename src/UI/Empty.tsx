import React from 'react';
import i18n from 'i18n-js';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
// import DataIcon from '../assets/data.svg';

// TODO: need to add image

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});

type EmptyTypes = {
  description?: string;
  style?: ViewStyle;
};

export const Empty: React.FC<EmptyTypes> = props => {
  const { description = i18n.t('ui.noData'), style } = props;

  return (
    <View style={[styles.wrapper, style]}>
      {/* <DataIcon /> */}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
