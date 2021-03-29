import React from 'react';
import { polygon } from '@turf/turf';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { getFieldsNameGeoJsonData } from '../../mapbox/geoJSONutils';

export const FieldMapLayer = props => {
  const { field, layerStyle } = props;

  const fieldPolygon = polygon(field.coordinates);

  return (
    <>
      <MapboxGL.ShapeSource id="fields" shape={fieldPolygon}>
        <MapboxGL.FillLayer id="fields" style={layerStyle.fields.paint} />
      </MapboxGL.ShapeSource>
      <MapboxGL.ShapeSource id="fields-name" shape={getFieldsNameGeoJsonData([field])}>
        <MapboxGL.SymbolLayer id="fields-name" style={layerStyle.fields.symbolLayout} />
      </MapboxGL.ShapeSource>
    </>
  );
};
