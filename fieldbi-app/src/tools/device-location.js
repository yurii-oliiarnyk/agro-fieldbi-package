import { Platform, PermissionsAndroid } from 'react-native';
import i18n from 'i18n-js';
import { showMessage } from 'react-native-flash-message';
import Geolocation from '@react-native-community/geolocation';

export const checkLocationPermissions = async () => {
  let hasPermission = true;

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }

  return hasPermission;
};

export const getLocationPermissions = async () => {
  let hasPermission = true;

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (!hasPermission) {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;

      if (!hasPermission) {
        showMessage({
          description: i18n.t('errors.noLocationPermissions'),
          message: i18n.t('errors.noPermissions'),
          type: 'danger'
        });
      }
    }
  }

  return hasPermission;
};

export const getDevicePosition = async () => {
  const getCurrentPosition = (enableHighAccuracy = true) =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy,
          timeout: 2000
        }
      );
    });

  return getCurrentPosition()
    .then(pos => [pos.coords.longitude, pos.coords.latitude])
    .catch(() =>
      getCurrentPosition(false)
        .then(pos => [pos.coords.longitude, pos.coords.latitude])
        .catch(error => {
          showMessage({
            description: error.message,
            message: i18n.t('errors.error'),
            type: 'danger'
          });

          return null;
        })
    );
};
