import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';
import ResourceTable from '../../../components/resource/ResourcesShow/ResourceTable';

const CounterpartiesShowInfo = props => {
  const { entitie } = props;

  const data = [
    {
      name: i18n.t('counterparty.type'),
      value:
        entitie.type === 0
          ? i18n.t('counterparty.typeIndividual')
          : i18n.t('counterparty.typeLegal'),
      key: 'type'
    }
  ];

  if (entitie.type === 0) {
    data.push(
      {
        name: i18n.t('counterparty.ipn'),
        value: entitie.code,
        key: 'code'
      },
      {
        name: i18n.t('counterparty.passportSeries'),
        value: entitie.passportSeries,
        key: 'passportSeries'
      },
      {
        name: i18n.t('counterparty.passportNumber'),
        value: entitie.passportNumber,
        key: 'passportNumber'
      },
      {
        name: i18n.t('generals.fullName'),
        value: entitie.name,
        key: 'name'
      },
      {
        name: i18n.t('counterparty.ownOrganization'),
        value: entitie.isOwnOrganization ? i18n.t('generals.yes') : i18n.t('generals.no'),
        key: 'isOwnOrganization'
      },
      {
        name: i18n.t('counterparty.comment'),
        value: entitie.comment,
        key: 'comment'
      },
      {
        name: i18n.t('counterparty.capable'),
        value: entitie.capable ? i18n.t('generals.yes') : i18n.t('generals.no'),
        key: 'capable'
      },
      {
        name: i18n.t('counterparty.hasIpnCopy'),
        value: entitie.hasIpnCopy ? i18n.t('generals.yes') : i18n.t('generals.no'),
        key: 'hasIpnCopy'
      },
      {
        name: i18n.t('counterparty.ipnChecked'),
        value: entitie.ipnChecked ? i18n.t('generals.yes') : i18n.t('generals.no'),
        key: 'ipnChecked'
      },
      {
        name: i18n.t('counterparty.hasPassportCopy'),
        value: entitie.hasPassportCopy ? i18n.t('generals.yes') : i18n.t('generals.no'),
        key: 'hasPassportCopy'
      }
    );
  } else {
    data.push(
      {
        name: i18n.t('counterparty.erdpou'),
        value: entitie.code,
        key: 'code'
      },
      {
        name: i18n.t('generals.name'),
        value: entitie.name,
        key: 'name'
      },
      {
        name: i18n.t('counterparty.ownOrganization'),
        value: entitie.isOwnOrganization ? i18n.t('generals.yes') : i18n.t('generals.no'),
        key: 'isOwnOrganization'
      },
      {
        name: i18n.t('counterparty.comment'),
        value: entitie.comment,
        key: 'comment'
      }
    );
  }

  data.push(
    {
      name: i18n.t('counterparty.phoneNumber'),
      value: entitie.phoneNumber,
      key: 'phoneNumber'
    },
    {
      name: i18n.t('counterparty.additionalPhoneNumber'),
      value: entitie.additionalPhoneNumber,
      key: 'additionalPhoneNumber'
    },
    {
      name: i18n.t('counterparty.contactPerson'),
      value: entitie.contactPerson,
      key: 'contactPerson'
    },
    {
      name: i18n.t('counterparty.email'),
      value: entitie.email,
      key: 'email'
    },
    {
      name: i18n.t('counterparty.address'),
      value: entitie.address,
      key: 'address'
    },
    {
      name: i18n.t('counterparty.sameAddress'),
      value: entitie.sameAddress ? i18n.t('generals.yes') : i18n.t('generals.no'),
      key: 'sameAddress'
    },
    {
      name: i18n.t('counterparty.addressActual'),
      value: !entitie.sameAddress && entitie.addressActual,
      key: 'addressActual'
    }
  );

  return <ResourceTable data={data} />;
};

CounterpartiesShowInfo.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(CounterpartiesShowInfo);
