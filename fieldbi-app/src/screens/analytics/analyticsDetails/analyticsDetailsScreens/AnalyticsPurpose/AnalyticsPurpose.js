import React from 'react';
import i18n from 'i18n-js';
import AnalyticsTabs from '../../AnalyticsTabs';
import AnalyticLink from '../../AnalyticLink';
import screens from '../../../../../navigation/screens';

const AnalyticsPurpose = () => {
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
      name: i18n.t('analytics.landPurpose.landsCount'),
      render: renderStaticColumn
    }
  ];

  const staticAreaColumns = [
    {
      key: 'area',
      dataIndex: 'area',
      name: i18n.t('analytics.landPurpose.landsArea'),
      render: renderStaticColumn
    }
  ];

  return (
    <AnalyticsTabs
      countURL="/api/v1/dashboard/statistics/land-purpose"
      areaURL="/api/v1/dashboard/statistics/land-purpose/area"
      staticCountColumns={staticCountColumns}
      staticAreaColumns={staticAreaColumns}
      linkConfig={{
        filterKey: 'landPurpose',
        resource: 'lands',
        screen: screens.Lands
      }}
    />
  );
};

export default AnalyticsPurpose;
