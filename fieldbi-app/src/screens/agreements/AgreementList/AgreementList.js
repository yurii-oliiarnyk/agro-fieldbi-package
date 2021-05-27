import React from 'react';
import i18n from 'i18n-js';
import ResourcesList from '../../../components/resource/ResourcesList';
import AgreementListItem from './AgreementListItem';

const AgreementList = () => (
  <ResourcesList
    name="agreements"
    renderItem={entitie => <AgreementListItem entitie={entitie} />}
    labels={{
      search: i18n.t('agreement.contractNumber'),
      empty: i18n.t('agreement.notFound')
    }}
  />
);

export default AgreementList;
