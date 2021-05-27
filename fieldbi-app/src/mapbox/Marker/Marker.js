import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import MarkerIcon from '../../assets/svg/marker-icon.svg';

const Marker = props => {
  const { coordinate, color } = props;

  return (
    <MapboxGL.PointAnnotation
      anchor={{ x: 0.5, y: 1 }}
      id="selected-marker"
      coordinate={coordinate}
    >
      <View style={{ alignItems: 'center' }}>
        <MarkerIcon style={{ width: 32, height: 32, fill: color }} />
      </View>
    </MapboxGL.PointAnnotation>
  );
};

Marker.propTypes = {
  coordinate: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired
};

export default Marker;
