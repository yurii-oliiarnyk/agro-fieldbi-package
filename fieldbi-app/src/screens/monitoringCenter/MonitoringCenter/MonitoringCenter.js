import React, { useEffect, useState, useMemo } from 'react';
import * as turf from '@turf/turf';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MonitoringCenterEntitiesSelect, MonitoringCenterContractButton } from './controls';
import { BottomControlsWrapper } from '../../../mapbox/MapControls';
import MonitoringCenterSearch from '../MonitoringCenterSearch/MonitoringCenterSearch';

import {
  moduleName,
  fetchFields,
  fieldsSelector,
  fetchLands,
  landsSelector
} from '../../../store/monitoring/monitoring';

import { defaultCenter, defaultZoom } from '../../../mapbox/config';
import {
  getMapGeoJsonData,
  getFieldsNameGeoJsonData,
  getFitBounds,
  centerOfPoligon
} from '../../../mapbox/geoJSONutils';
import Map from '../../../mapbox/Map';
import useActiveLands from '../hooks/useActiveLands';
import Marker from '../../../mapbox/Marker';

import MonitoringCenterPopover from '../MonitoringCenterPopover';

const MonitoringCenter = props => {
  const [showLands, setShowLands] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const {
    activeLandsLoading,
    activeLands,
    selectedContractState,
    setSelectedContractState
  } = useActiveLands();

  const route = useRoute();

  const { selectedPolygon, showLandsProps, contractState } = route.params || {};

  useEffect(() => {
    if (selectedPolygon) {
      setSelected(selectedPolygon);
      setShowLands(selectedPolygon.resourceName === 'lands');
    }
  }, [selectedPolygon]);

  useEffect(() => {
    if (typeof contractState !== 'undefined') {
      setSelectedContractState(contractState);
    }
  }, [contractState]);

  useEffect(() => {
    if (typeof showLandsProps !== 'undefined') {
      setShowLands(showLandsProps);
    }
  }, [showLandsProps]);

  const {
    // fields
    fetchFields,
    fields,
    fieldsLoading,
    fieldsLoaded,
    // lands
    fetchLands,
    lands,
    landsLoading,
    landsLoaded
  } = props;

  useEffect(() => {
    fetchFields();
  }, []);

  useEffect(() => {
    if (showLands) {
      if (!landsLoaded && !landsLoading) {
        fetchLands();
      }
    }
  }, [showLands]);

  const fieldsData = getMapGeoJsonData(fields, false);

  const onShapeClick = resourceName => ({ features }) => {
    const [feature] = features;
    const { properties } = feature;
    const { id } = properties;

    if (!id) {
      return;
    }

    setSelectedContractState(null);
    setSelected({
      id,
      resourceName
    });
  };

  const getSelectedGeoJsonData = coordinates => turf.polygon(coordinates);

  const isSelectedPolygon = id => selected && selected.id === id;

  const fieldsShape = useMemo(() => getFieldsNameGeoJsonData(fields), [fields]);
  const landsShape = useMemo(() => getMapGeoJsonData(lands), [lands]);

  const activeFieldsShape = useMemo(() => {
    const filteredFeatures = fieldsShape.features.filter(
      land => !isSelectedPolygon(land.properties.id)
    );

    return {
      ...fieldsShape,
      features: filteredFeatures
    };
  }, [fieldsShape, selected]);

  const activeLandsShape = useMemo(() => {
    const filteredIds = [...activeLands];

    const filteredFeatures = landsShape.features.filter(
      land =>
        filteredIds.some(id => id === land.properties.id) && !isSelectedPolygon(land.properties.id)
    );

    return {
      ...landsShape,
      features: filteredFeatures
    };
  }, [landsShape, activeLands, selected]);

  const inActiveLandsShape = useMemo(() => {
    const filteredIds = [...activeLands];

    const filteredFeatures = landsShape.features.filter(
      land =>
        filteredIds.every(id => id !== land.properties.id) && !isSelectedPolygon(land.properties.id)
    );

    return {
      ...landsShape,
      features: filteredFeatures
    };
  }, [landsShape, activeLands, selected]);

  useEffect(() => {
    if (!selected) {
      setSelectedDetails(null);
      return;
    }

    const { id, resourceName } = selected;
    let details;

    if (resourceName === 'fields' && fields.length) {
      details = fields.find(field => field.id === id);
    }

    if (resourceName === 'lands' && lands.length) {
      details = lands.find(land => land.id === id);
    }

    setSelectedDetails(details);
  }, [selected, fields, lands]);

  const bounds = useMemo(() => {
    if (!selected || !selectedDetails) {
      return null;
    }

    const bounds = getFitBounds([selectedDetails.coordinates]);

    return {
      sw: [bounds[0], bounds[3]],
      ne: [bounds[2], bounds[1]],
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16
    };
  }, [selectedDetails]);

  const center = useMemo(() => {
    if (!selected || !selectedDetails) {
      return null;
    }

    return centerOfPoligon(selectedDetails.coordinates);
  }, [selected, selectedDetails]);

  return (
    <View style={{ flex: 1 }}>
      <MonitoringCenterSearch
        resourceName={showLands ? 'lands' : 'fields'}
        onSelected={setSelected}
      />
      {selected && <MonitoringCenterPopover {...selected} onClose={() => setSelected(null)} />}
      <BottomControlsWrapper visible={!selected}>
        {showLands && landsLoaded && (
          <View style={{ marginBottom: 16 }}>
            <MonitoringCenterContractButton
              showLabel={!!selectedContractState}
              params={{ contractState }}
              loading={activeLandsLoading}
            />
          </View>
        )}
        <MonitoringCenterEntitiesSelect
          fieldsLoading={fieldsLoading}
          landsLoading={landsLoading}
          showLands={showLands}
          setShowLands={setShowLands}
        />
      </BottomControlsWrapper>
      <Map
        cameraSettings={{
          defaultSettings: {
            zoomLevel: defaultZoom,
            centerCoordinate: defaultCenter
          },
          bounds
        }}
      >
        {mapProps => {
          const { layerStyle } = mapProps;

          return (
            <>
              {fieldsLoaded && (
                <>
                  <MapboxGL.ShapeSource
                    id="fields"
                    shape={fieldsData}
                    onPress={onShapeClick('fields')}
                  >
                    <MapboxGL.FillLayer id="fields" style={layerStyle.fields.paint} />
                  </MapboxGL.ShapeSource>
                  <MapboxGL.ShapeSource id="fields-name" shape={activeFieldsShape}>
                    <MapboxGL.SymbolLayer
                      id="fields-name"
                      style={layerStyle.fields.symbolLayout}
                      minZoomLevel={9}
                    />
                  </MapboxGL.ShapeSource>
                </>
              )}

              {showLands && landsLoaded && (
                <>
                  <MapboxGL.ShapeSource
                    id="lands"
                    onPress={onShapeClick('lands')}
                    shape={inActiveLandsShape}
                  >
                    <MapboxGL.FillLayer id="lands" style={layerStyle.lands.paint} />
                  </MapboxGL.ShapeSource>
                  {activeLands.length > 0 && selectedContractState && (
                    <MapboxGL.ShapeSource id="lands-active" shape={activeLandsShape}>
                      <MapboxGL.FillLayer
                        id="lands-active"
                        style={{
                          ...layerStyle.lands.paint,
                          fillColor: selectedContractState.backgroundColor
                        }}
                      />
                    </MapboxGL.ShapeSource>
                  )}
                </>
              )}

              {selected && selectedDetails && (
                <MapboxGL.ShapeSource
                  id="selected"
                  shape={getSelectedGeoJsonData(selectedDetails.coordinates)}
                >
                  <MapboxGL.FillLayer id="selected" style={layerStyle.selected.paint} />
                </MapboxGL.ShapeSource>
              )}

              {selected && selectedDetails && center && (
                <Marker
                  coordinate={center}
                  color={
                    selected.resourceName === 'lands'
                      ? layerStyle.lands.marker.color
                      : layerStyle.fields.marker.color
                  }
                />
              )}
            </>
          );
        }}
      </Map>
    </View>
  );
};

MonitoringCenter.propTypes = {
  // fields
  fetchFields: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired)
      ).isRequired
    })
  ).isRequired,
  fieldsLoading: PropTypes.bool.isRequired,
  fieldsLoaded: PropTypes.bool.isRequired,
  // lands
  fetchLands: PropTypes.func.isRequired,
  lands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      coordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired)
      ).isRequired
    })
  ).isRequired,
  landsLoading: PropTypes.bool.isRequired,
  landsLoaded: PropTypes.bool.isRequired
};

export default connect(
  state => {
    return {
      // fields
      fields: fieldsSelector(state),
      fieldsLoading: state[moduleName].fieldsLoading,
      fieldsLoaded: state[moduleName].fieldsLoaded,
      // lands
      lands: landsSelector(state),
      landsLoading: state[moduleName].landsLoading,
      landsLoaded: state[moduleName].landsLoaded
    };
  },
  { fetchFields, fetchLands }
)(MonitoringCenter);
