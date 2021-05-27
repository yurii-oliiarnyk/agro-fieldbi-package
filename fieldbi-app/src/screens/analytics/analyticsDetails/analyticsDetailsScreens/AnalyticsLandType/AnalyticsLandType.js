import React from 'react';
import i18n from 'i18n-js';
import AnalyticsTabs from '../../AnalyticsTabs';
import AnalyticLink from '../../AnalyticLink';
import screens from '../../../../../navigation/screens';

const AnalyticsLandType = () => {
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
      name: i18n.t('analytics.landType.landsCount'),
      render: renderStaticColumn
    }
  ];

  const staticAreaColumns = [
    {
      key: 'area',
      dataIndex: 'area',
      name: i18n.t('analytics.landType.landsArea'),
      render: renderStaticColumn
    }
  ];

  return (
    <AnalyticsTabs
      countURL="/api/v1/dashboard/statistics/land-type"
      areaURL="/api/v1/dashboard/statistics/land-type/area"
      staticCountColumns={staticCountColumns}
      staticAreaColumns={staticAreaColumns}
      linkConfig={{
        filterKey: 'landType',
        resource: 'lands',
        screen: screens.Lands
      }}
    />
  );
};

export default AnalyticsLandType;
