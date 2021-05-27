import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';

import ResourcesListItem from '../../../../components/resource/ResourcesList/ResourcesListItem';
import ResourcesListItemName from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemName';
import ResourcesListItemInfo from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemInfo';

const CounterpartiesListItem = props => {
  const { entitie } = props;

  const { name, type, code } = entitie;
  const resourceName = 'dictionary/counterparties';

  const MainComponent = (
    <>
      <ResourcesListItemName name={name} resourceName={resourceName} id={entitie.id} />
      {type === 0 ? (
        <>
          <ResourcesListItemInfo
            name={i18n.t('counterparty.typeShort')}
            value={i18n.t('counterparty.typeIndividual')}
          />
          <ResourcesListItemInfo name={i18n.t('counterparty.ipn')} value={code} small />
        </>
      ) : (
        <>
          <ResourcesListItemInfo
            name={i18n.t('counterparty.typeShort')}
            value={i18n.t('counterparty.typeLegal')}
          />
          <ResourcesListItemInfo name={i18n.t('counterparty.erdpou')} value={code} small />
        </>
      )}
    </>
  );

  return <ResourcesListItem MainComponent={MainComponent} />;
};

CounterpartiesListItem.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default CounterpartiesListItem;
