import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import i18n from 'i18n-js';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ResourceTable from '../../../components/resource/ResourcesShow/ResourceTable';
import OutputNumber from '../../../components/UI/OutputNumber';
import {
  getAgreementName,
  getAgreementSubtype,
  getTenantOrganization,
  getLandlordOrganization,
  getRentAmount
} from '../utils';

import { DATE_FORMAT } from '../../../config';
import screens from '../../../navigation/screens';

const AgreementShortView = props => {
  const { document } = props;

  const { push } = useNavigation();

  const onNamePress = (name, id) =>
    push(screens.LandBankShow, {
      title: name,
      resourceName: 'agreements',
      entitieId: id
    });

  const data = [
    {
      key: 'agreementNumber',
      name: i18n.t('agreement.contractNumber'),
      value: document.agreementNumber,
      render: (value, styles) => {
        const { textStyle, linkStyle } = styles;

        return (
          <TouchableOpacity onPress={() => onNamePress(value, document.id)}>
            <Text style={[textStyle, linkStyle]}>{value}</Text>
          </TouchableOpacity>
        );
      }
    },
    {
      key: 'land',
      name: i18n.t('land.singleName'),
      value: document.land && document.landShortData.landNumber
    },
    {
      key: 'contractType',
      name: i18n.t('agreement.contractType'),
      value: getAgreementName(document.type)
    },
    {
      key: 'subtype',
      name: i18n.t('agreement.subtype'),
      value: getAgreementSubtype(document.subtype)
    },
    {
      key: 'tenantOrganization',
      name: getTenantOrganization(document.type),
      value:
        document.tenantOrganization &&
        document.tenantOrganizationShortData &&
        document.tenantOrganizationShortData.name
    },
    {
      key: 'landlord',
      name: getLandlordOrganization(document.type),
      value: document.landlord && document.landlordShortData && document.landlordShortData.name
    },
    {
      key: 'dateOfCreation',
      name: i18n.t('agreement.dateOfDocument'),
      value: document.dateOfCreation && moment.unix(document.dateOfCreation).format(DATE_FORMAT)
    },
    {
      key: 'validFromDate',
      name: i18n.t('agreement.validFrom'),
      value: document.validFromDate && moment.unix(document.validFromDate).format(DATE_FORMAT)
    },
    {
      key: 'validByDate',
      name: i18n.t('agreement.validUntil'),
      value: document.validByDate && moment.unix(document.validByDate).format(DATE_FORMAT)
    },
    {
      key: 'share',
      name: i18n.t('agreement.share'),
      value: document.share && <OutputNumber value={document.share} />
    },
    {
      key: 'ngoCurrent',
      name: i18n.t('land.ngoCurrent'),
      value: document.ngoCurrent && <OutputNumber value={document.ngoCurrent} type="price" />
    },
    {
      key: 'rentPercentage',
      name: i18n.t('agreement.rentPercentage'),
      value: document.rentPercentage && (
        <OutputNumber value={document.rentPercentage} type="percentage" />
      )
    },
    {
      key: 'rentAmount',
      name: getRentAmount(document.type),
      value: document.rentAmount && <OutputNumber value={document.rentAmount} type="price" />
    },
    {
      key: 'state',
      name: i18n.t('agreement.state'),
      value: document.state && document.stateShortData.name
    },
    {
      key: 'registrar',
      name: i18n.t('agreement.registrar'),
      value: document.registrar
    },
    {
      key: 'dateOfRegistration',
      name: i18n.t('agreement.registrationDate'),
      value:
        document.dateOfRegistration && moment.unix(document.dateOfRegistration).format(DATE_FORMAT)
    },
    {
      name: i18n.t('agreement.hasActOfAcceptance'),
      key: 'hasActOfAcceptance',
      value: document.hasActOfAcceptance ? i18n.t('generals.yes') : i18n.t('generals.no')
    },
    {
      name: i18n.t('documentLocations.singleName'),
      value:
        document.documentLocation &&
        document.documentLocationShortData &&
        document.documentLocationShortData.name,
      key: 'documentLocations'
    },
    {
      key: 'comment',
      name: i18n.t('agreement.comment'),
      value: document.comment
    }
  ];

  return <ResourceTable data={data} />;
};

AgreementShortView.propTypes = {
  document: PropTypes.object.isRequired
};

export default AgreementShortView;
