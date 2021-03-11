import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as turf from '@turf/turf';
import { ResourceMap } from '../../resource/ResourcesShow';
import { axios } from '../../axios';
import { getFieldsNameGeoJsonData, getMapGeoJsonData } from '../../mapbox/geoJSONutils';

export const FieldShowMap = props => {
  const [landsLoading, setLandsLoading] = useState(false);
  const [lands, setLands] = useState(false);
  const [landsLoaded, setLandsLoaded] = useState(false);

  const { entitie, showLands } = props;
  const { coordinates, id } = entitie;

  const fetchLands = () => {
    setLandsLoading(true);

    axios.get(`/api/v1/fields/${id}/lands`).then(responce => {
      setLands(responce.data.data);
      setLandsLoading(false);
      setLandsLoaded(true);
    });
  };

  useEffect(() => {
    if (showLands) {
      fetchLands();
    }
  }, []);

  if (!(coordinates && coordinates.length > 0)) {
    return null;
  }

  const fieldsData = turf.polygon(coordinates);

  return (
    <ResourceMap
      id={entitie.id}
      resourceName="fields"
      coordinates={coordinates}
      loading={landsLoading}
      showLandsOnBounds={showLands}
    >
      {({ layerStyle }) => (
        <>
          <MapboxGL.ShapeSource id="fields" shape={fieldsData}>
            <MapboxGL.FillLayer id="fields" style={layerStyle.fields.paint} />
          </MapboxGL.ShapeSource>
          <MapboxGL.ShapeSource id="fields-name" shape={getFieldsNameGeoJsonData([entitie])}>
            <MapboxGL.SymbolLayer id="fields-name" style={layerStyle.fields.symbolLayout} />
          </MapboxGL.ShapeSource>

          {landsLoaded && (
            <MapboxGL.ShapeSource id="lands" shape={getMapGeoJsonData(lands)}>
              <MapboxGL.FillLayer id="lands" style={layerStyle.lands.paint} />
            </MapboxGL.ShapeSource>
          )}
        </>
      )}
    </ResourceMap>
  );
};

FieldShowMap.defaultProps = {
  showLands: false,
};

FieldShowMap.propTypes = {
  entitie: PropTypes.object.isRequired,
  showLands: PropTypes.bool,
};
