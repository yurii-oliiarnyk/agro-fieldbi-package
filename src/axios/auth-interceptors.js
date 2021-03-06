import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './index';
import { TOKEN_KEY, DOMAIN_KEY, getAPI } from '../config';

export const setupAuthInterceptors = onUnauthenticated => {
  axios.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const baseURL = await AsyncStorage.getItem(DOMAIN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (baseURL) {
      const API = getAPI(baseURL);
      config.baseURL = API;
    }

    return config;
  });

  axios.interceptors.response.use(undefined, error => {
    const status = error.status || (error.response ? error.response.status : 0);

    onUnauthenticated(status);

    return Promise.reject(error);
  });
};
