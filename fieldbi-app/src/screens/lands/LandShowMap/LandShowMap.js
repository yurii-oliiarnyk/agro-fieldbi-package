import React from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import ResourceMap from '../../../components/resource/ResourcesShow/ResourceMap';
import {
  getLandsNameGeoJsonData,
  getMapGeoJsonData,
  getFieldsNameGeoJsonData
} from '../../../mapbox/geoJSONutils';

const LandShowMap = props => {
  const { entitie, showFields } = props;
  const { coordinates, fields } = entitie;

  if (!(coordinates && coordinates.length > 0)) {
    return null;
  }

  const landData = turf.polygon(coordinates);

  return (
    <ResourceMap showLandsOnBounds coordinates={coordinates} id={entitie.id} resourceName="lands">
      {({ layerStyle }) => (
        <>
          <MapboxGL.ShapeSource id="lands" shape={landData}>
            <MapboxGL.FillLayer id="lands" style={layerStyle.lands.paint} />
          </MapboxGL.ShapeSource>
          <MapboxGL.ShapeSource id="land-name" shape={getLandsNameGeoJsonData([entitie])}>
            <MapboxGL.SymbolLayer id="land-name" style={layerStyle.lands.symbolLayout} />
          </MapboxGL.ShapeSource>

          {showFields && fields.length > 0 && (
            <>
              <MapboxGL.ShapeSource id="fields" shape={getMapGeoJsonData(fields)}>
                <MapboxGL.FillLayer id="fields" style={layerStyle.fields.paint} />
              </MapboxGL.ShapeSource>
              <MapboxGL.ShapeSource id="fields-name" shape={getFieldsNameGeoJsonData(fields)}>
                <MapboxGL.SymbolLayer
                  id="fields-name"
                  style={layerStyle.fields.symbolLayout}
                  minZoomLevel={9}
                />
              </MapboxGL.ShapeSource>
            </>
          )}
        </>
      )}
    </ResourceMap>
  );
};

LandShowMap.propTypes = {
  entitie: PropTypes.object.isRequired,
  showFields: PropTypes.bool
};

export default LandShowMap;
