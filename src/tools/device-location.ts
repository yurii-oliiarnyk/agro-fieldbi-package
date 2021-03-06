import { Platform, PermissionsAndroid } from 'react-native';
import i18n from 'i18n-js';
import { showMessage } from 'react-native-flash-message';
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from '@react-native-community/geolocation';

export const checkLocationPermissions = async (): Promise<boolean> => {
  let hasPermission = true;

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }

  return hasPermission;
};

export const getLocationPermissions = async (): Promise<boolean> => {
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
          type: 'danger',
        });
      }
    }
  }

  return hasPermission;
};

export const getDevicePosition = async (): Promise<[number, number] | null> => {
  const getCurrentPosition = (enableHighAccuracy = true): Promise<GeolocationResponse> =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position: GeolocationResponse) => {
          resolve(position);
        },
        (error: GeolocationError) => {
          reject(error);
        },
        {
          enableHighAccuracy,
          timeout: 2000,
        }
      );
    });

  return getCurrentPosition()
    .then((pos: GeolocationResponse) => [pos.coords.longitude, pos.coords.latitude])
    .catch(() =>
      getCurrentPosition(false)
        .then((pos: GeolocationResponse) => [pos.coords.longitude, pos.coords.latitude])
        .catch((error: GeolocationError) => {
          showMessage({
            description: error.message,
            message: i18n.t('errors.error'),
            type: 'danger',
          });

          return null;
        })
    );
};
