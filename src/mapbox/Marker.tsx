import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

type MarketTypes = {
  color: string;
  coordinate: [number, number];
};

export const Marker: React.FC<MarketTypes> = (props): JSX.Element => {
  const { coordinate, color } = props;

  return (
    <MapboxGL.PointAnnotation
      anchor={{ x: 0.5, y: 1 }}
      id="selected-marker"
      coordinate={coordinate}
    >
      <FontAwesomeIcons name="map-marker" color={color} size={32} />
    </MapboxGL.PointAnnotation>
  );
};
