import React from 'react';
import i18n from 'i18n-js';
import ResourcesList from '../../../components/resource/ResourcesList';
import LandListItem from './LandListItem';

const LandList = () => (
  <ResourcesList
    name="lands"
    renderItem={entitie => <LandListItem entitie={entitie} />}
    labels={{
      search: i18n.t('land.listName'),
      empty: i18n.t('land.notFound')
    }}
  />
);

export default LandList;
