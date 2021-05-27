import React from 'react';
import i18n from 'i18n-js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ResourceShowNavigator from '../../../components/resource/ResourcesShow/ResourceShowNavigator';
import AppBottomTabIcon from '../../../components/AppBottomTabIcon';

import screens from '../../../navigation/screens';

import AgreementShowInfo from '../AgreementShowInfo';
import AgreementShowAddAgreements from '../AgreementShowAddAgreements';
import AgreementShowLand from '../AgreementShowLand';
import AgreementShowFinances from '../AgreementShowFinances';

import IconAddAgreements from '../../../assets/icons/IconAddAgreements';
import IconGenerals from '../../../assets/icons/IconGenerals';
import IconLand from '../../../assets/icons/IconLand';

const AgreementsShowNavigator = () => {
  const config = [
    {
      screenName: screens.AgreementShowInfo,
      screen: AgreementShowInfo,
      label: i18n.t('agreement.tabs.generals'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconGenerals />} />
    },
    {
      screenName: screens.AgreementShowAddAgreements,
      screen: AgreementShowAddAgreements,
      label: i18n.t('agreement.tabs.addAgreements'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconAddAgreements />} />
    },
    {
      screenName: screens.AgreementShowLand,
      screen: AgreementShowLand,
      label: i18n.t('agreement.tabs.land'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconLand />} />
    },
    {
      screenName: screens.AgreementShowFinances,
      screen: AgreementShowFinances,
      label: i18n.t('agreement.tabs.finances'),
      icon: props => <AppBottomTabIcon {...props} Icon={<Icon name="finance" size={24} />} />
    }
  ];

  return <ResourceShowNavigator screens={config} />;
};

export default AgreementsShowNavigator;
