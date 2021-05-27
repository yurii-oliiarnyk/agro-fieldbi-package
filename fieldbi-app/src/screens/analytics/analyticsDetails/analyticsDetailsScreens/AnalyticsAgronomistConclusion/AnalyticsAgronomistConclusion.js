import React from 'react';
import i18n from 'i18n-js';
import AnalyticsTabs from '../../AnalyticsTabs';
import screens from '../../../../../navigation/screens';
import AnalyticLink from '../../AnalyticLink';

const AnalyticsAgronomistConclusion = () => {
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
      name: i18n.t('analytics.agronomistConclusion.agreementsCount'),
      render: renderStaticColumn
    }
  ];

  const staticAreaColumns = [
    {
      key: 'area',
      dataIndex: 'area',
      name: i18n.t('analytics.agronomistConclusion.landsArea'),
      render: renderStaticColumn
    }
  ];

  return (
    <AnalyticsTabs
      countURL="/api/v1/dashboard/statistics/agronomist-conclusion"
      areaURL="/api/v1/dashboard/statistics/agronomist-conclusion/area"
      staticCountColumns={staticCountColumns}
      staticAreaColumns={staticAreaColumns}
      linkConfig={{
        filterKey: 'agronomistConclusion',
        resource: 'lands',
        screen: screens.Agreements
      }}
    />
  );
};

export default AnalyticsAgronomistConclusion;
