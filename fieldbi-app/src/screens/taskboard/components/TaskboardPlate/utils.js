import AsyncStorage from '@react-native-community/async-storage';

export const setPlateState = async (id, value) => {
  await AsyncStorage.setItem(id, JSON.stringify(value));
};

export const getPlateState = async id => {
  const state = await AsyncStorage.getItem(id);

  if (state === 'false') {
    return false;
  }

  return state;
};
