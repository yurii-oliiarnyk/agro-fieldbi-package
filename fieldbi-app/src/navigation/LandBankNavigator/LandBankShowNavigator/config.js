import React from 'react';
import { View, Text } from 'react-native';
import FieldsShowNavigator from '../../../screens/fields/FieldsShowNavigator';
import LandsShowNavigator from '../../../screens/lands/LandsShowNavigator';
import AgreementsShowNavigator from '../../../screens/agreements/AgreementsShowNavigator';
import CounterpartiesShowNavigator from '../../../screens/counterparties/CounterpartiesShowNavigator';

const landBankShowConfig = {
  fields: {
    component: <FieldsShowNavigator />
  },
  lands: {
    component: <LandsShowNavigator />
  },
  agreements: {
    component: <AgreementsShowNavigator />
  },
  'dictionary/counterparties': {
    component: <CounterpartiesShowNavigator />
  }
};

const notFound = (
  <View style={{ padding: 16 }}>
    <Text>Щось пішло не так. Не знайдено екрана для такого ресурсу</Text>
  </View>
);

export const getLandBankShowScreen = resoure => {
  return landBankShowConfig?.[resoure]?.component ?? notFound;
};
