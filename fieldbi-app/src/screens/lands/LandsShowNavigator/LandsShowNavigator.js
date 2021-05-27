import React from 'react';
import i18n from 'i18n-js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ResourceShowNavigator from '../../../components/resource/ResourcesShow/ResourceShowNavigator';
import AppBottomTabIcon from '../../../components/AppBottomTabIcon';
import IconGenerals from '../../../assets/icons/IconGenerals';
import IconContracts from '../../../assets/icons/IconContracts';
import IconPurpose from '../../../assets/icons/IconPurpose';
import IconDocs from '../../../assets/icons/IconDocs';

import LandShowPurpose from '../LandShowPurpose';
import LandShowAgreements from '../LandShowAgreements';
import LandShowInfo from '../LandShowInfo';
import LandShowDocuments from '../LandShowDocuments';
import LandShowFinances from '../LandShowFinances';

import screens from '../../../navigation/screens';

const LandsShowNavigator = () => {
  const config = [
    {
      screenName: screens.LandShowInfo,
      screen: LandShowInfo,
      label: i18n.t('land.tabs.generals'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconGenerals />} />
    },
    {
      screenName: screens.LandShowAgrements,
      screen: LandShowAgreements,
      label: i18n.t('land.tabs.agreements'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconContracts />} />
    },
    {
      screenName: screens.LandShowDocuments,
      screen: LandShowDocuments,
      label: i18n.t('land.tabs.documents'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconDocs />} />
    },
    {
      screenName: screens.LandShowPurpose,
      screen: LandShowPurpose,
      label: i18n.t('land.tabs.purpose'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconPurpose />} />
    },
    {
      screenName: screens.LandShowFinances,
      screen: LandShowFinances,
      label: i18n.t('land.tabs.finances'),
      icon: props => <AppBottomTabIcon {...props} Icon={<Icon name="finance" size={24} />} />
    }
  ];

  return <ResourceShowNavigator screens={config} />;
};

export default LandsShowNavigator;
