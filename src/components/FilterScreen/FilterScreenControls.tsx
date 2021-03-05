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

type FilterScreenControlsTypes = {
  onSubmit: () => void;
  onClear: () => void;
  onCancel: () => void;
  isFilteredValues: boolean;
};

export const FilterScreenControls: React.FC<FilterScreenControlsTypes> = props => {
  const { isFilteredValues, onSubmit, onCancel, onClear } = props;

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom > 16 ? insets.bottom : 16 }]}>
      <View style={styles.buttonWrap}>
        {isFilteredValues ? (
          <>
            <View style={styles.button}>
              <Button type="outlined" onPress={onClear}>
                {i18n.t('ui.filter.clear')}
              </Button>
            </View>
            <View style={styles.button}>
              <Button onPress={onSubmit}>{i18n.t('ui.filter.action')}</Button>
            </View>
          </>
        ) : (
          <View style={styles.button}>
            <Button type="outlined" onPress={onCancel}>
              {i18n.t('ui.filter.cancel')}
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};
