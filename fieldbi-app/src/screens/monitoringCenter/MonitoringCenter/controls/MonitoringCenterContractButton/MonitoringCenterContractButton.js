import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { FAB, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../../constants';
import screens from '../../../../../navigation/screens';

const MonitoringCenterContractButton = props => {
  const { params, loading, showLabel } = props;
  const { navigate } = useNavigation();

  return (
    <View>
      {showLabel && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 2
          }}
        >
          <Badge>1</Badge>
        </View>
      )}

      <FAB
        loading={loading}
        style={{ backgroundColor: COLORS.MAIN }}
        icon="filter-variant"
        onPress={() => {
          navigate({
            name: screens.MonitoringCenterFilter,
            params
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
  showLabel: PropTypes.bool.isRequired
};

export default MonitoringCenterContractButton;
