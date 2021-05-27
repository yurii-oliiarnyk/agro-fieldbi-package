import React from 'react';
import moment from 'moment';
import i18n from 'i18n-js';
import AnalyticsTabs from '../../AnalyticsTabs';
import AnalyticLink from '../../AnalyticLink';
import screens from '../../../../../navigation/screens';
import { FILTER_DATE_FORMAT } from '../../../../../config';

const AnalyticsAgreementYear = () => {
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
      name: i18n.t('analytics.agreementYear.count'),
      render: renderStaticColumn
    }
  ];

  const staticAreaColumns = [
    {
      key: 'area',
      dataIndex: 'area',
      name: i18n.t('analytics.agreementYear.landsArea'),
      render: renderStaticColumn
    }
  ];

  const renderColumnLink = (value, filterParams = {}, config) => {
    const { filterKey, resource, screen, valueKey } = config;
    const validByDate = value.id;
    const { subdivisions } = filterParams;

    return (
      <AnalyticLink
        value={value[valueKey]}
        resource={resource}
        screen={screen}
        filterParams={{
          subdivisions,
          [filterKey]: {
            from: moment(new Date(validByDate))
              .startOf('year')
              .format(FILTER_DATE_FORMAT),
            to: moment(new Date(validByDate))
              .endOf('year')
              .format(FILTER_DATE_FORMAT)
          }
        }}
      />
    );
  };

  return (
    <AnalyticsTabs
      countURL="/api/v1/dashboard/statistics/agreement-year"
      areaURL="/api/v1/dashboard/statistics/agreement-year/area"
      staticCountColumns={staticCountColumns}
      staticAreaColumns={staticAreaColumns}
      renderColumnLink={renderColumnLink}
      linkConfig={{
        filterKey: 'validByDate',
        resource: 'agreements',
        screen: screens.Agreements
      }}
    />
  );
};

export default AnalyticsAgreementYear;
