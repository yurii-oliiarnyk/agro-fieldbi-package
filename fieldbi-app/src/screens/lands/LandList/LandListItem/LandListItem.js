import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import i18n from 'i18n-js';

import ResourcesListItem from '../../../../components/resource/ResourcesList/ResourcesListItem';
import ResourcesListItemName from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemName';
import ResourcesListItemInfo from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemInfo';
import ResourcesListItemContour from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemContour';

import OutputNumber from '../../../../components/UI/OutputNumber';

const LandListItem = props => {
  const { entitie, linkedTitle } = props;

  const { landNumber, cadastralArea, fields, agreements } = entitie;

  const filteredAgreements = agreements.filter(agreement => agreement.type !== 4);

  const resourceName = 'lands';

  const MainComponent = (
    <>
      <ResourcesListItemName
        name={landNumber}
        linked={linkedTitle}
        resourceName={resourceName}
        id={entitie.id}
      />
      <ResourcesListItemInfo
        name={i18n.t('land.fields')}
        value={
          fields.length > 0
            ? fields.map(field => field.name).join(', ')
            : i18n.t('generals.noDataSymbol')
        }
      />
      <ResourcesListItemInfo
        name={i18n.t('land.agreement')}
        value={
          filteredAgreements.length > 0
            ? filteredAgreements.map(agreement => agreement.agreementNumber).join(', ')
            : i18n.t('generals.noDataSymbol')
        }
        small
      />
    </>
  );

  const RightComponent = (
    <Text>
      <OutputNumber value={cadastralArea} type="area" />
    </Text>
  );

  const LeftComponent = (
    <ResourcesListItemContour coordinates={entitie.coordinates} color="#00A1FF" />
  );

  return (
    <ResourcesListItem
      MainComponent={MainComponent}
      RightComponent={RightComponent}
      LeftComponent={LeftComponent}
    />
  );
};

LandListItem.propTypes = {
  entitie: PropTypes.object.isRequired,
  linkedTitle: PropTypes.bool
};

export default LandListItem;
