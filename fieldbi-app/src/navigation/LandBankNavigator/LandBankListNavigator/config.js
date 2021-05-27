import React from 'react';
import i18n from 'i18n-js';

import FieldList from '../../../screens/fields/FieldList';
import IconField from '../../../assets/icons/IconField';

import LandList from '../../../screens/lands/LandList';
import IconLand from '../../../assets/icons/IconLand';

import AgreementList from '../../../screens/agreements/AgreementList';
import IconContracts from '../../../assets/icons/IconContracts';

import CounterpartiesList from '../../../screens/counterparties/CounterpartiesList';
import IconContragents from '../../../assets/icons/IconContragents';

import screens from '../../screens';

export const tabsConfig = [
  {
    name: screens.Fields,
    component: FieldList,
    icon: <IconField />,
    label: i18n.t('pages.fields')
  },
  {
    name: screens.Lands,
    component: LandList,
    icon: <IconLand />,
    label: i18n.t('pages.lands')
  },
  {
    name: screens.Agreements,
    component: AgreementList,
    icon: <IconContracts />,
    label: i18n.t('pages.agreements')
  },
  {
    name: screens.Counterparties,
    component: CounterpartiesList,
    icon: <IconContragents />,
    label: i18n.t('pages.counterparties')
  }
];

export const getNameByTabIndex = index => {
  const tab = tabsConfig[index];

  return tab.label;
};

export const getNameByScreenName = name => {
  const tab = tabsConfig.find(tab => tab.name === name);

  return tab.label;
};
