import React from 'react';
import i18n from 'i18n-js';
import AnalyticsTabs from '../../AnalyticsTabs';
import screens from '../../../../../navigation/screens';
import AnalyticLink from '../../AnalyticLink';

const AnalyticsAgreementState = () => {
  const renderStaticColumn = (value, record) => {
    const { filterParams } = record;
    const { subdivisions } = filterParams;

    return [
      value,
      <AnalyticLink
        value={value}
        filterParams={{ subdivisions }}
        screen={screens.Agreements}
        resource="agreements"
      />
    ];
  };

  const staticCountColumns = [
    {
      key: 'count',
      dataIndex: 'count',
      name: i18n.t('analytics.agreementState.agreementsCount'),
      render: renderStaticColumn
    }
  ];

  const staticAreaColumns = [
    {
      key: 'area',
      dataIndex: 'area',
      name: i18n.t('analytics.agreementState.landsArea'),
      render: renderStaticColumn
    }
  ];

  return (
    <AnalyticsTabs
      countURL="/api/v1/dashboard/statistics/agreement-state"
      areaURL="/api/v1/dashboard/statistics/agreement-state/area"
      staticCountColumns={staticCountColumns}
      staticAreaColumns={staticAreaColumns}
      linkConfig={{
        filterKey: 'state',
        resource: 'agreements',
        screen: screens.Agreements
      }}
    />
  );
};

export default AnalyticsAgreementState;
