import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { useSafeArea } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import AppButton from '../../../UI/AppButton';

const FilterScreenControls = props => {
  const { isFilteredValues, onSubmit, onCancel, onClear } = props;

  const insets = useSafeArea();

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom > 16 ? insets.bottom : 16 }]}>
      <View style={styles.buttonWrap}>
        {isFilteredValues ? (
          <>
            <View style={styles.button}>
              <AppButton type="outlined" onPress={onClear}>
                {i18n.t('ui.filter.clear')}
              </AppButton>
            </View>
            <View style={styles.button}>
              <AppButton onPress={onSubmit}>{i18n.t('ui.filter.action')}</AppButton>
            </View>
          </>
        ) : (
          <View style={styles.button}>
            <AppButton type="outlined" onPress={onCancel}>
              {i18n.t('ui.filter.cancel')}
            </AppButton>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: 16
  },
  button: {
    flex: 1,
    marginHorizontal: 2
  },
  buttonWrap: {
    flexDirection: 'row'
  }
});

FilterScreenControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isFilteredValues: PropTypes.bool.isRequired
};

export default FilterScreenControls;
