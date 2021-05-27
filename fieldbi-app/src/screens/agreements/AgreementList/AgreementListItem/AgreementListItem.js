import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import i18n from 'i18n-js';

import ResourcesListItem from '../../../../components/resource/ResourcesList/ResourcesListItem';
import ResourcesListItemName from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemName';
import ResourcesListItemInfo from '../../../../components/resource/ResourcesList/ResourcesListItem/ResourcesListItemInfo';
import OutputNumber from '../../../../components/UI/OutputNumber';
import { getAgreementName } from '../../utils';
import { DATE_FORMAT } from '../../../../config';

const AgreementListItem = props => {
  const { entitie } = props;

  const { agreementNumber, type, share, validFromDate, validByDate } = entitie;
  const resourceName = 'agreements';

  const MainComponent = (
    <>
      <ResourcesListItemName name={agreementNumber} resourceName={resourceName} id={entitie.id} />
      <ResourcesListItemInfo
        name={i18n.t('agreement.contractType')}
        value={getAgreementName(type)}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 16 }}>
          <ResourcesListItemInfo
            name={i18n.t('agreement.validFrom')}
            value={validFromDate && moment.unix(validFromDate).format(DATE_FORMAT)}
            small
          />
        </View>
        <View>
          <ResourcesListItemInfo
            name={i18n.t('agreement.validUntil')}
            value={validByDate && moment.unix(validByDate).format(DATE_FORMAT)}
            small
          />
        </View>
      </View>
    </>
  );

  const RightComponent = (
    <Text>
      <OutputNumber value={share} fixedDecimalScale />
    </Text>
  );

  return <ResourcesListItem MainComponent={MainComponent} RightComponent={RightComponent} />;
};

AgreementListItem.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default AgreementListItem;
