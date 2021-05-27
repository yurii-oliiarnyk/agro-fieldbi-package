import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import i18n from 'i18n-js';
import ResourceTable from '../../../components/resource/ResourcesShow/ResourceTable';
import { DATE_FORMAT } from '../../../config';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';

const LandShowDocuments = props => {
  const { entitie } = props;

  const data = [
    {
      name: i18n.t('land.docs.stateAct'),
      value:
        entitie.landDocument &&
        (entitie.landDocument.stateActSeries ||
          entitie.landDocument.stateActNumber ||
          entitie.landDocument.stateActIssuanceDate)
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'stateAct'
    },
    {
      name: i18n.t('land.docs.stateActSeries'),
      value: entitie.landDocument && entitie.landDocument.stateActSeries,
      key: 'stateActSeries'
    },
    {
      name: i18n.t('land.docs.stateActNumber'),
      value: entitie.landDocument && entitie.landDocument.stateActNumber,
      key: 'stateActNumber'
    },
    {
      name: i18n.t('land.docs.stateActIssuanceDate'),
      value:
        entitie.landDocument &&
        entitie.landDocument.stateActIssuanceDate &&
        moment.unix(entitie.landDocument.stateActIssuanceDate).format(DATE_FORMAT),
      key: 'stateActIssuanceDate'
    },
    {
      name: i18n.t('land.docs.statement'),
      value:
        entitie.landDocument &&
        (entitie.landDocument.statementSeries ||
          entitie.landDocument.statementNumber ||
          entitie.landDocument.statementIssuanceDate)
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'statement'
    },
    {
      name: i18n.t('land.docs.statementSeries'),
      value: entitie.landDocument && entitie.landDocument.statementSeries,
      key: 'statementSeries'
    },
    {
      name: i18n.t('land.docs.statementNumber'),
      value: entitie.landDocument && entitie.landDocument.statementNumber,
      key: 'statementNumber'
    },
    {
      name: i18n.t('land.docs.statementIssuanceDate'),
      value:
        entitie.landDocument &&
        entitie.landDocument.statementIssuanceDate &&
        moment.unix(entitie.landDocument.statementIssuanceDate).format(DATE_FORMAT),
      key: 'statementIssuanceDate'
    },
    {
      name: i18n.t('land.docs.extract'),
      value:
        entitie.landDocument &&
        (entitie.landDocument.extractSeries ||
          entitie.landDocument.extractNumber ||
          entitie.landDocument.extractIssuanceDate)
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'extract'
    },
    {
      name: i18n.t('land.docs.extractSeries'),
      value: entitie.landDocument && entitie.landDocument.extractSeries,
      key: 'extractSeries'
    },
    {
      name: i18n.t('land.docs.extractNumber'),
      value: entitie.landDocument && entitie.landDocument.extractNumber,
      key: 'extractNumber'
    },
    {
      name: i18n.t('land.docs.extractIssuanceDate'),
      value:
        entitie.landDocument &&
        entitie.landDocument.extractIssuanceDate &&
        moment.unix(entitie.landDocument.extractIssuanceDate).format(DATE_FORMAT),
      key: 'extractIssuanceDate'
    },
    {
      name: i18n.t('land.docs.certificate'),
      value:
        entitie.landDocument &&
        (entitie.landDocument.certificateSeries ||
          entitie.landDocument.certificateNumber ||
          entitie.landDocument.certificateIssuanceDate)
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'certificate'
    },
    {
      name: i18n.t('land.docs.certificateSeries'),
      value: entitie.landDocument && entitie.landDocument.certificateSeries,
      key: 'certificateSeries'
    },
    {
      name: i18n.t('land.docs.certificateNumber'),
      value: entitie.landDocument && entitie.landDocument.certificateNumber,
      key: 'certificateNumber'
    },
    {
      name: i18n.t('land.docs.certificateIssuanceDate'),
      value:
        entitie.landDocument &&
        entitie.landDocument.certificateIssuanceDate &&
        moment.unix(entitie.landDocument.certificateIssuanceDate).format(DATE_FORMAT),
      key: 'certificateIssuanceDate'
    },

    {
      name: i18n.t('land.docs.isActOfDeliveryExists'),
      value:
        entitie.landDocument && entitie.landDocument.isActOfDeliveryExists
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'isActOfDeliveryExists'
    },
    {
      name: i18n.t('land.docs.isDeclarationExists'),
      value:
        entitie.landDocument && entitie.landDocument.isDeclarationExists
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'isDeclarationExists'
    },
    {
      name: i18n.t('land.docs.isCopyOfPlanExists'),
      value:
        entitie.landDocument && entitie.landDocument.isCopyOfPlanExists
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'isCopyOfPlanExists'
    },
    {
      name: i18n.t('land.docs.isCopyOfCadastralPlanExists'),
      value:
        entitie.landDocument && entitie.landDocument.isCopyOfCadastralPlanExists
          ? i18n.t('generals.yes')
          : i18n.t('generals.no'),
      key: 'isCopyOfCadastralPlanExists'
    }
  ];

  return <ResourceTable data={data} />;
};

LandShowDocuments.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(LandShowDocuments);
