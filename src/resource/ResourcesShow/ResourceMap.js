import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { Map, getFitBounds, Loader, TouchableFeedback } from 'agro-package';

export const ResourceMap = props => {
  const { coordinates, children, loading, goToMap } = props;

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

  return (
    <View style={styles.view}>
      <Map cameraSettings={{ defaultSettings: { bounds } }}>
        {({ layerStyle }) => children({ layerStyle })}
      </Map>
      {goToMap && (
        <TouchableFeedback activeOpacity={0.8} onPress={goToMap} style={styles.button}>
          <Text style={styles.buttonText}>{i18n.t('monitoring.showOnMap')}</Text>
        </TouchableFeedback>
      )}
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
