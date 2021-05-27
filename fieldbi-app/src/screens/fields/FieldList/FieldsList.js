import React from 'react';
import i18n from 'i18n-js';
import ResourcesList from '../../../components/resource/ResourcesList';
import FieldsListItem from './FieldsListItem';

const FieldsList = () => (
  <ResourcesList
    name="fields"
    renderItem={entitie => <FieldsListItem entitie={entitie} />}
    labels={{
      search: i18n.t('field.listName'),
      empty: i18n.t('field.notFound')
    }}
  />
);

export default FieldsList;
