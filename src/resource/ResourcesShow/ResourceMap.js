import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { TouchableFeedback } from '../../UI/TouchableFeedback';
import { Map } from '../../mapbox/Map';
import { getFitBounds } from '../../mapbox/geoJSONutils';
import { Loader } from '../../UI/Loader';
import { SCREENS } from '../../monitoringCenter/config';

export const ResourceMap = props => {
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
      paddingBottom: 16,
    };
  }, [coordinates]);

  if (loading) {
    return (
      <View style={styles.view}>
        <Loader />
      </View>
    );
  }

  const onPressHandler = () =>
    navigate(SCREENS.MAP_STACK, {
      screen: SCREENS.MAP,
      params: {
        selectedPolygon: {
          id,
          resourceName,
        },
        showLands: showLandsOnBounds,
      },
    });

  return (
    <View style={styles.view}>
      <Map cameraSettings={{ defaultSettings: { bounds } }}>
        {({ layerStyle }) => children({ layerStyle })}
      </Map>
      <TouchableFeedback activeOpacity={0.8} onPress={() => onPressHandler()} style={styles.button}>
        <Text style={styles.buttonText}>{i18n.t('monitoring.showOnMap')}</Text>
      </TouchableFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 200,
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
    paddingVertical: 5,
  },
  buttonText: {
    color: '#00A1FF',
  },
});

ResourceMap.propTypes = {
  coordinates: PropTypes.array,
  children: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  goToMap: PropTypes.func.isRequired,
};
