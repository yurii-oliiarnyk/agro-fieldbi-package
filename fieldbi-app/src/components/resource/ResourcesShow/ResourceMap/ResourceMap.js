import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import Map from '../../../../mapbox/Map';
import { getFitBounds } from '../../../../mapbox/geoJSONutils';
import AppLoader from '../../../AppLoader';
import AppTouchableFeedback from '../../../AppTouchableFeedback';
import screens from '../../../../navigation/screens';

const ResourceMap = props => {
  const { coordinates, children, loading, showLandsOnBounds, id, resourceName } = props;

  const { navigate } = useNavigation();

  const bounds = useMemo(() => {
    const fitBounds = getFitBounds([coordinates]);

    return {
      sw: [fitBounds[0], fitBounds[3]],
      ne: [fitBounds[2], fitBounds[1]],
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16
    };
  }, [coordinates]);

  if (loading) {
    return (
      <View style={styles.view}>
        <AppLoader />
      </View>
    );
  }

  const onPressHandler = () =>
    navigate(screens.MonitoringCenterNavigator, {
      screen: screens.MonitoringCenter,
      params: {
        selectedPolygon: {
          id,
          resourceName
        },
        showLands: showLandsOnBounds
      }
    });

  return (
    <View style={styles.view}>
      <Map cameraSettings={{ defaultSettings: { bounds } }}>
        {({ layerStyle }) => children({ layerStyle })}
      </Map>
      <AppTouchableFeedback
        activeOpacity={0.8}
        onPress={() => onPressHandler()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{i18n.t('monitoring.showOnMap')}</Text>
      </AppTouchableFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 200
  },
  button: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#ECF8FF',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#00A1FF',
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  buttonText: {
    color: '#00A1FF'
  }
});

ResourceMap.propTypes = {
  coordinates: PropTypes.array,
  children: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  showLandsOnBounds: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  resourceName: PropTypes.string.isRequired
};

export default ResourceMap;
