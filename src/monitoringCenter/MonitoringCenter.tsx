// @ts-nocheck
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import * as turf from '@turf/turf';
import MapboxGL, { OnPressEvent } from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';

import { defaultCenter, defaultZoom } from '../mapbox/config';
import { Map } from '../mapbox/Map';
import { Marker } from '../mapbox/Marker';
import { MonitoringCenterContractButton } from './MonitoringCenterContractButton';
import { MonitoringCenterSearch } from './MonitoringCenterSearch/MonitoringCenterSearch';
import { MonitoringCenterEntitiesSelect } from './MonitoringCenterEntitiesSelect';
import { MonitoringCenterPopover } from './MonitoringCenterPopover';
import {
  getMapGeoJsonData,
  getFieldsNameGeoJsonData,
  getFitBounds,
  centerOfPoligon,
  FieldType,
  LandType,
} from '../mapbox/geoJSONutils';
import { useActiveLands } from './useActiveLands';
import { useMonitoringCenterStore } from './useStore/useStore';
import { BottomControlsWrapper } from '../mapbox/controls';

type MonitoringCenterResource = 'fields' | 'lands';
type MonitoringCenterSelectedPolygon = {
  id: number;
  resourceName: MonitoringCenterResource;
};

type MonitoringCenterTypes = {
  fields?: boolean;
  lands?: boolean;
  params?: {
    selectedPolygon?: MonitoringCenterSelectedPolygon;
    showLandsProps?: boolean;
    contractState?: { id: number };
  };
};

export const MonitoringCenter: React.FC<MonitoringCenterTypes> = props => {
  const {
    fields: enableFields,
    lands: enableLands,
    params: { selectedPolygon, showLandsProps, contractState } = {},
  } = props;

  const [showLands, setShowLands] = useState(() => {
    if (!enableFields) {
      return true;
    }

    return false;
  });
  const [selected, setSelected] = useState<MonitoringCenterSelectedPolygon | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<FieldType | LandType | null>(null);

  const {
    fields,
    lands,
    fieldsLoaded,
    fieldsLoading,
    landsLoaded,
    landsLoading,
    loadFields,
    loadLands,
  } = useMonitoringCenterStore();

  const {
    activeLandsLoading,
    activeLands,
    selectedContractState,
    setSelectedContractState,
  } = useActiveLands(contractState);

  useEffect(() => {
    if (!selectedPolygon) {
      return;
    }

    setSelected(selectedPolygon);
    setShowLands(selectedPolygon.resourceName === 'lands');
  }, [selectedPolygon]);

  useEffect(() => {
    if (typeof showLandsProps !== 'undefined') {
      setShowLands(showLandsProps);
    }
  }, [showLandsProps]);

  useEffect(() => {
    if (!enableFields) {
      return;
    }

    loadFields();
  }, [enableFields, loadFields]);

  useEffect(() => {
    if (!enableLands || !showLands) {
      return;
    }

    if (landsLoaded || landsLoading) {
      return;
    }

    loadLands();
  }, [enableLands, showLands, loadLands, landsLoaded, landsLoading]);

  const onShapeClick = (resourceName: MonitoringCenterResource) => ({ features }: OnPressEvent) => {
    const [feature] = features;
    const { properties } = feature;
    const { id } = properties as { id?: number };

    if (id) {
      setSelectedContractState(null);
      setSelected({
        id,
        resourceName,
      });
    }
  };

  const isSelectedPolygon = useCallback(id => selected && selected.id === id, [selected]);

  const fieldsData = useMemo(() => getMapGeoJsonData(fields), [fields]);
  const fieldsShape = useMemo(() => getFieldsNameGeoJsonData(fields), [fields]);
  const landsShape = useMemo(() => getMapGeoJsonData(lands), [lands]);

  const activeFieldsShape = useMemo(() => {
    const filteredFeatures = fieldsShape.features.filter(
      field => !isSelectedPolygon(field.properties.id)
    );

    return {
      ...fieldsShape,
      features: filteredFeatures,
    };
  }, [fieldsShape, isSelectedPolygon]);

  const [activeLandsShape, inActiveLandsShape] = useMemo(() => {
    const filteredIds = [...activeLands];

    const activeFeatures = landsShape.features.filter(
      land =>
        filteredIds.some(id => id === land.properties.id) && !isSelectedPolygon(land.properties.id)
    );

    const inActiveFeatures = landsShape.features.filter(
      land =>
        filteredIds.every(id => id !== land.properties.id) && !isSelectedPolygon(land.properties.id)
    );

    return [
      {
        ...landsShape,
        features: activeFeatures,
      },
      {
        ...landsShape,
        features: inActiveFeatures,
      },
    ];
  }, [landsShape, activeLands, isSelectedPolygon]);

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

    setSelectedDetails(details ?? null);
  }, [selected, fields, lands]);

  const bounds = useMemo(() => {
    if (!selectedDetails) {
      return;
    }

    const fitBounds = getFitBounds([selectedDetails.coordinates]);

    return {
      sw: [fitBounds[0], fitBounds[3]],
      ne: [fitBounds[2], fitBounds[1]],
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 16,
      paddingBottom: 16,
    };
  }, [selectedDetails]);

  const center = useMemo(() => {
    if (!selectedDetails) {
      return;
    }

    return centerOfPoligon(selectedDetails.coordinates);
  }, [selectedDetails]);

  return (
    <View style={{ flex: 1, height: 300 }}>
      <MonitoringCenterSearch
        resourceName={showLands ? 'lands' : 'fields'}
        entities={showLands ? lands : fields}
        loading={showLands ? landsLoading : fieldsLoading}
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
        {enableFields && enableLands && (
          <MonitoringCenterEntitiesSelect
            fieldsLoading={fieldsLoading}
            landsLoading={landsLoading}
            showLands={showLands}
            setShowLands={setShowLands}
          />
        )}
      </BottomControlsWrapper>
      <Map
        cameraSettings={{
          defaultSettings: {
            zoomLevel: defaultZoom,
            centerCoordinate: defaultCenter,
          },
          bounds,
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
                          fillColor: selectedContractState.backgroundColor,
                        }}
                      />
                    </MapboxGL.ShapeSource>
                  )}
                </>
              )}

              {selectedDetails && (
                <MapboxGL.ShapeSource
                  id="selected"
                  shape={turf.polygon(selectedDetails.coordinates)}
                >
                  <MapboxGL.FillLayer id="selected" style={layerStyle.selected.paint} />
                </MapboxGL.ShapeSource>
              )}

              {selected && center && (
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
