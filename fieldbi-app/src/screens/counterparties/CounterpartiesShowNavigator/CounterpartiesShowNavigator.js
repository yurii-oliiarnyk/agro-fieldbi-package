import React from 'react';
import i18n from 'i18n-js';
import ResourceShowNavigator from '../../../components/resource/ResourcesShow/ResourceShowNavigator';
import AppBottomTabIcon from '../../../components/AppBottomTabIcon';
import IconGenerals from '../../../assets/icons/IconGenerals';
import IconContracts from '../../../assets/icons/IconContracts';

import screens from '../../../navigation/screens';

import CounterpartiesShowInfo from '../CounterpartiesShowInfo';
import CounterpartiesShowAgreements from '../CounterpartiesShowAgreements';

const CounterpartiesShowNavigator = () => {
  const config = [
    {
      screenName: screens.CounterpartyShowInfo,
      screen: CounterpartiesShowInfo,
      label: i18n.t('counterparty.tabs.generals'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconGenerals />} />
    },
    {
      screenName: screens.CounterpartyShowAgreements,
      screen: CounterpartiesShowAgreements,
      label: i18n.t('counterparty.tabs.agreements'),
      icon: props => <AppBottomTabIcon {...props} Icon={<IconContracts />} />
    }
  ];

  return <ResourceShowNavigator screens={config} />;
};

export default CounterpartiesShowNavigator;
