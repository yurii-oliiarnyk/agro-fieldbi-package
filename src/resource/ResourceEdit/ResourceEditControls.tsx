import React from 'react';
import i18n from 'i18n-js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { Button } from '../../UI/Button';

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 2,
  },
  buttonWrap: {
    flexDirection: 'row',
  },
});

type ResourceEditControlsTypes = {
  onSubmit: () => void;
  onCancel: () => void;
};

export const ResourceEditControls: React.FC<ResourceEditControlsTypes> = props => {
  const { onSubmit, onCancel } = props;

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.buttonWrap}>
        <View style={styles.button}>
          <Button type="outlined" onPress={onCancel}>
            {i18n.t('generals.cancel')}
          </Button>
        </View>
        <View style={styles.button}>
          <Button onPress={onSubmit}>{i18n.t('generals.save')}</Button>
        </View>
      </View>
    </View>
  );
};
