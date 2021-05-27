import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View, StyleSheet } from 'react-native';
import {
  checkLocationPermissions,
  getLocationPermissions,
  getDevicePosition
} from '../../tools/device-location';
import { LocationControl, TopControlsWrapper, StyleControl } from '../MapControls';

import { styles as mapStyles, getLayerStyle, satelliteTiles, defaultMaxZoomLevel } from '../config';
import CadastralLayer from '../CadastralLayer';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic3Rhc2hhcmFiYXJhIiwiYSI6ImNqeWg3eHY4NzA4Y28zbW54ZWNoY3YyY2kifQ.xBTHmk1pQFOZ9f5AMGyAJQ'
);

const { MapView, Camera, UserLocation, RasterSource, RasterLayer } = MapboxGL;

const Map = props => {
  const { children, cameraSettings, ...mapProps } = props;
  const [currentMapStyle, setCurrentMapStyle] = useState('default');
  const [showCadastralLayer, setShowCadastralLayer] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const camera = useRef(null);
  const map = useRef(null);

  const flyToUserLocation = async () => {
    const location = await getDevicePosition();

    if (location) {
      camera.current.flyTo(location);
    }
  };

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
          setStyle={setCurrentMapStyle}
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
          layerStyle: getLayerStyle(currentMapStyle)
        })}
      </MapView>
    </View>
  );
};

Map.propTypes = {
  children: PropTypes.func.isRequired,
  cameraSettings: PropTypes.object
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    position: 'relative'
  },
  map: {
    flex: 1
  }
});

export default Map;
