import React from 'react';
import i18n from 'i18n-js';
import ResourceShowNavigator from '../../../components/resource/ResourcesShow/ResourceShowNavigator';
import AppBottomTabIcon from '../../../components/AppBottomTabIcon';

import screens from '../../../navigation/screens';

import FieldShowInfo from '../FieldShowInfo';
import FieldShowLands from '../FieldShowLands';

import IconLand from '../../../assets/icons/IconLand';
import IconGenerals from '../../../assets/icons/IconGenerals';

const FieldsShowNavigator = () => {
  const config = [
    {
      screenName: screens.FieldShowInfo,
      screen: FieldShowInfo,
      label: i18n.t('field.tabs.generals'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconLand />} />
    },
    {
      screenName: screens.FieldShowLands,
      screen: FieldShowLands,
      label: i18n.t('field.tabs.lands'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconGenerals />} />
    }
  ];

  return <ResourceShowNavigator screens={config} />;
};

export default FieldsShowNavigator;
