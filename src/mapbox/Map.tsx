import React, { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import MapboxGL, { CameraProps } from '@react-native-mapbox-gl/maps';
import { View, StyleSheet } from 'react-native';
import {
  checkLocationPermissions,
  getLocationPermissions,
  getDevicePosition,
} from '../tools/device-location';
import { LocationControl, TopControlsWrapper, StyleControl } from './controls';

import {
  styles as mapStyles,
  LayerStyleType,
  LayerStyle,
  getLayerStyle,
  satelliteTiles,
  defaultMaxZoomLevel,
  TOKEN,
} from './config';
import CadastralLayer from './CadastralLayer';

MapboxGL.setAccessToken(TOKEN);

const { MapView, Camera, UserLocation, RasterSource, RasterLayer } = MapboxGL;

type MapChildrenProps = {
  layerStyle: LayerStyle;
};

type MapTypes = {
  children: (props: MapChildrenProps) => ReactNode;
  cameraSettings: CameraProps;
  onFlyToUser?: (userPoint: [number, number]) => void;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
});

export const Map: React.FC<MapTypes> = props => {
  const { children, cameraSettings, onFlyToUser, ...mapProps } = props;
  const [currentMapStyle, setCurrentMapStyle] = useState<LayerStyleType>('default');
  const [showCadastralLayer, setShowCadastralLayer] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const camera = useRef(null);
  const map = useRef(null);

  const flyToUserLocation = useCallback(async () => {
    const location = await getDevicePosition();

    if (location) {
      if (typeof onFlyToUser === 'function') {
        onFlyToUser(location);
      }

      camera.current?.flyTo(location);
    }
  }, []);

  const tryShowUserPointer = async () => {
    const hasLocationPermissions = await checkLocationPermissions();
    setShowUserLocation(hasLocationPermissions);
  };

  useEffect(() => {
    tryShowUserPointer();
  }, []);

  const locationControlPressHandler = async () => {
    const hasLocationPermissions = await getLocationPermissions();

    if (hasLocationPermissions) {
      setShowUserLocation(true);
      await flyToUserLocation();
    }
  };

  return (
    <View style={styles.view}>
      <TopControlsWrapper>
        <StyleControl
          style={currentMapStyle}
          setStyle={style => setCurrentMapStyle(style as LayerStyleType)}
          showCadastralLayer={showCadastralLayer}
          setShowCadastralLayer={setShowCadastralLayer}
        />
        <LocationControl onPress={locationControlPressHandler} />
      </TopControlsWrapper>
      <MapView
        rotateEnabled={false}
        styleURL={mapStyles[currentMapStyle]}
        style={styles.map}
        ref={map}
        {...mapProps}
      >
        {currentMapStyle === 'satellite' && (
          <RasterSource id="satellite" tileUrlTemplates={satelliteTiles} tileSize={256}>
            <RasterLayer id="satellite" aboveLayerID="background" />
          </RasterSource>
        )}

        {showCadastralLayer && <CadastralLayer />}

        {showUserLocation && <UserLocation onPress={() => flyToUserLocation()} />}

        <Camera ref={camera} maxZoomLevel={defaultMaxZoomLevel} {...cameraSettings} />

        {children({
          layerStyle: getLayerStyle(currentMapStyle),
        })}
      </MapView>
    </View>
  );
};
