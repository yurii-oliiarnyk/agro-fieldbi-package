import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { FAB, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../colors';
import { SCREENS } from './config';

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
  },
  fab: {
    backgroundColor: COLORS.MAIN,
  },
  wrap: {
    marginBottom: 16,
  },
});

type MonitoringCenterContractButtonTypes = {
  params: {
    contractState?: { id: number };
  };
  loading: boolean;
  showLabel: boolean;
};

export const MonitoringCenterContractButton: React.FC<MonitoringCenterContractButtonTypes> = props => {
  const { params, loading, showLabel } = props;
  const { navigate } = useNavigation();

  return (
    <View style={styles.wrap}>
      <View pointerEvents="none" style={styles.label}>
        <Badge visible={showLabel}>1</Badge>
      </View>
      <FAB
        loading={loading}
        style={styles.fab}
        icon="filter-variant"
        onPress={() => {
          navigate({
            name: SCREENS.MAP_FILTER,
            params,
          });
        }}
        color="#fff"
      />
    </View>
  );
};

MonitoringCenterContractButton.propTypes = {
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  showLabel: PropTypes.bool.isRequired,
};
