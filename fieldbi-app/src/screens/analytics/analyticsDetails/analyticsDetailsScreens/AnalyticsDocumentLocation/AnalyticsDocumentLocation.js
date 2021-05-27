import React from 'react';
import i18n from 'i18n-js';
import AnalyticsTabs from '../../AnalyticsTabs';
import AnalyticLink from '../../AnalyticLink';
import screens from '../../../../../navigation/screens';

const AnalyticsDocumentLocation = () => {
  const renderStaticColumn = (value, record) => [
    value,
    <AnalyticLink
      value={value}
      resource="lands"
      screen={screens.Lands}
      filterParams={record.filterParams}
    />
  ];

  const staticCountColumns = [
    {
      key: 'count',
      dataIndex: 'count',
      name: i18n.t('analytics.documentLocation.agreementsCount'),
      render: renderStaticColumn
    }
  ];

  const staticAreaColumns = [
    {
      key: 'area',
      dataIndex: 'area',
      name: i18n.t('analytics.documentLocation.landsArea'),
      render: renderStaticColumn
    }
  ];

  return (
    <AnalyticsTabs
      countURL="/api/v1/dashboard/statistics/document-location"
      areaURL="/api/v1/dashboard/statistics/document-location/area"
      staticCountColumns={staticCountColumns}
      staticAreaColumns={staticAreaColumns}
      linkConfig={{
        filterKey: 'documentLocation',
        resource: 'agreements',
        screen: screens.Agreements
      }}
    />
  );
};

export default AnalyticsDocumentLocation;
