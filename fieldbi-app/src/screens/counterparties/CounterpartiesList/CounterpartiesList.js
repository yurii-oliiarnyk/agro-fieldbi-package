import React from 'react';
import i18n from 'i18n-js';
import ResourcesList from '../../../components/resource/ResourcesList';
import CounterpartiesListItem from './CounterpartiesListItem';

const CounterpartiesList = () => (
  <ResourcesList
    name="dictionary/counterparties"
    renderItem={entitie => <CounterpartiesListItem entitie={entitie} />}
    labels={{
      search: i18n.t('counterparty.listName'),
      empty: i18n.t('counterparty.notFound')
    }}
  />
);

export default CounterpartiesList;
