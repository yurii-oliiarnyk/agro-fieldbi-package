import React from 'react';
import i18n from 'i18n-js';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { TouchableFeedback } from '../UI/TouchableFeedback';
import { COLORS } from '../colors';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonActive: {
    backgroundColor: COLORS.MAIN,
  },
  buttonText: {
    color: '#202030',
  },
  buttonTextActive: {
    color: '#fff',
  },
});

type MonitoringCenterEntitiesSelectTypes = {
  setShowLands: (show: boolean) => void;
  showLands: boolean;
  fieldsLoading: boolean;
  landsLoading: boolean;
};

export const MonitoringCenterEntitiesSelect: React.FC<MonitoringCenterEntitiesSelectTypes> = props => {
  const { showLands, fieldsLoading, landsLoading, setShowLands } = props;

  return (
    <View style={styles.wrapper}>
      <TouchableFeedback
        style={[styles.button, !showLands && styles.buttonActive]}
        onPress={() => setShowLands(false)}
      >
        {fieldsLoading && (
          <ActivityIndicator
            size="small"
            color={!showLands ? '#fff' : COLORS.MAIN}
            style={styles.buttonIcon}
          />
        )}
        <Text style={[styles.buttonText, !showLands && styles.buttonTextActive]}>
          {i18n.t('monitoring.fields')}
        </Text>
      </TouchableFeedback>
      <TouchableFeedback
        style={[styles.button, showLands && styles.buttonActive]}
        onPress={() => setShowLands(true)}
      >
        {landsLoading && (
          <ActivityIndicator
            size="small"
            color={showLands ? '#fff' : COLORS.MAIN}
            style={styles.buttonIcon}
          />
        )}
        <Text style={[styles.buttonText, showLands && styles.buttonTextActive]}>
          {i18n.t('monitoring.lands')}
        </Text>
      </TouchableFeedback>
    </View>
  );
};
