import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { ResourceMap } from '../../resource/ResourcesShow';
import { axios } from '../../axios';
import { getMapGeoJsonData } from '../../mapbox/geoJSONutils';
import { FieldMapLayer } from './FieldMapLayer';

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

  return (
    <ResourceMap
      coordinates={coordinates}
      loading={landsLoading}
      linked={{
        id: entitie.id,
        resourceName: 'fields',
        showLandsOnBounds: showLands,
      }}
    >
      {({ layerStyle }) => (
        <>
          <FieldMapLayer layerStyle={layerStyle} field={entitie} />

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
