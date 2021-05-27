import React from 'react';
import i18n from 'i18n-js';
import AnalyticsTabs from '../../AnalyticsTabs';
import AnalyticLink from '../../AnalyticLink';
import screens from '../../../../../navigation/screens';

const AnalyticsSoilType = () => {
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
      name: i18n.t('analytics.soilType.agreementsCount'),
      render: renderStaticColumn
    }
  ];

  const staticAreaColumns = [
    {
      key: 'area',
      dataIndex: 'area',
      name: i18n.t('analytics.soilType.landsArea'),
      render: renderStaticColumn
    }
  ];

  return (
    <AnalyticsTabs
      countURL="/api/v1/dashboard/statistics/soil-type"
      areaURL="/api/v1/dashboard/statistics/soil-type/area"
      staticCountColumns={staticCountColumns}
      staticAreaColumns={staticAreaColumns}
      linkConfig={{
        filterKey: 'soilType',
        resource: 'lands',
        screen: screens.Lands
      }}
    />
  );
};

export default AnalyticsSoilType;
