import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import AppTabs from '../../../components/AppTabs';
import AppWarning from '../../../components/AppWarning';
import AgreementShortView from '../../agreements/AgreementShortView';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const LandShowAgreements = props => {
  const { entitie } = props;
  const { agreements } = entitie;

  const filteredAgreements = agreements.filter(document => document.type !== 4);

  return (
    <AppTabs
      ListEmptyComponent={<AppWarning title={i18n.t('generals.dataNotStored')} />}
      data={filteredAgreements}
      keyExtractor={agreement => agreement.id}
      renderName={agreement => agreement.agreementNumber}
      renderTab={agreement => <AgreementShortView document={agreement} />}
    />
  );
};

LandShowAgreements.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(LandShowAgreements, { scrollable: false });
