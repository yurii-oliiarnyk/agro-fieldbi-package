import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import AppTouchableFeedback from '../../../../../components/AppTouchableFeedback';
import { COLORS } from '../../../../../constants';

const MonitoringCenterEntitiesSelect = props => {
  const { showLands, fieldsLoading, landsLoading, setShowLands } = props;

  return (
    <View style={styles.wrapper}>
      <AppTouchableFeedback
        style={[styles.button, !showLands && styles.buttonActive]}
        onPress={() => setShowLands(false)}
      >
        {fieldsLoading && (
          <ActivityIndicator
            size="small"
            color={!showLands ? '#fff' : COLORS.MAIN}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={[styles.buttonText, !showLands && styles.buttonTextActive]}>
          {i18n.t('monitoring.fields')}
        </Text>
      </AppTouchableFeedback>
      <AppTouchableFeedback
        style={[styles.button, showLands && styles.buttonActive]}
        onPress={() => setShowLands(true)}
      >
        {landsLoading && (
          <ActivityIndicator
            size="small"
            color={showLands ? '#fff' : COLORS.MAIN}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={[styles.buttonText, showLands && styles.buttonTextActive]}>
          {i18n.t('monitoring.lands')}
        </Text>
      </AppTouchableFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignSelf: 'center'
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8
  },
  buttonActive: {
    backgroundColor: COLORS.MAIN
  },
  buttonText: {
    color: '#202030'
  },
  buttonTextActive: {
    color: '#fff'
  }
});

MonitoringCenterEntitiesSelect.propTypes = {
  setShowLands: PropTypes.func.isRequired,
  showLands: PropTypes.bool.isRequired,
  fieldsLoading: PropTypes.bool.isRequired,
  landsLoading: PropTypes.bool.isRequired
};

export default MonitoringCenterEntitiesSelect;
