import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import AppTabs from '../../../components/AppTabs';
import AppWarning from '../../../components/AppWarning';
import AgreementShowTable from '../AgreementShowTable';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const AgreementShowAddAgreements = props => {
  const { entitie } = props;
  const { children } = entitie;

  return (
    <AppTabs
      ListEmptyComponent={<AppWarning title={i18n.t('generals.dataNotStored')} />}
      data={children}
      keyExtractor={document => document.id}
      renderName={document => document.agreementNumber}
      renderTab={document => <AgreementShowTable document={document} />}
    />
  );
};

AgreementShowAddAgreements.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(AgreementShowAddAgreements, { scrollable: false });
