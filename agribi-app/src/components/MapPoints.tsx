/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';

const SOURCE_ID = 'points';

type MapPointsProps = {
  points: Array<{
    coordinates: [number, number];
    name?: string;
    color?: string;
    id: number;
  }>;
};

export const MapPoints: React.FC<MapPointsProps> = props => {
  const { points } = props;

  const geojson = {
    type: 'FeatureCollection',
    features: points.map((point, index) => {
      return turf.point(point.coordinates, {
        name: point.name ?? index + 1,
        color: point.color ?? '#00A1FF',
        id: point.id ?? index,
      });
    }),
  };

  return (
    <>
      <MapboxGL.ShapeSource id={SOURCE_ID} shape={geojson}>
        <MapboxGL.CircleLayer
          id="circle"
          style={{
            circleRadius: 10,
            circleColor: ['get', 'color'],
          }}
        />
        <MapboxGL.CircleLayer
          id="circle-2"
          style={{
            circleRadius: 15,
            circleColor: ['get', 'color'],
            circleOpacity: 0.5,
          }}
        />
        <MapboxGL.CircleLayer
          id="circle-3"
          style={{
            circleRadius: 20,
            circleColor: ['get', 'color'],
            circleOpacity: 0.25,
          }}
        />
        <MapboxGL.SymbolLayer
          id="circle-name"
          style={{
            textField: ['get', 'name'],
            textVariableAnchor: ['center'],
            textRadialOffset: 0.5,
            textJustify: 'auto',
            textFont: ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            textSize: 12,
            textColor: '#fff',
          }}
        />
      </MapboxGL.ShapeSource>
    </>
  );
};
