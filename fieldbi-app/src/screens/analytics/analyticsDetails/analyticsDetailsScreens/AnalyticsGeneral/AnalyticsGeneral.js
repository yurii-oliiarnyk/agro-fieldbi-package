import React from 'react';
import i18n from 'i18n-js';
import AnalyticPage from '../../AnalyticPage';
import AnalyticLink from '../../AnalyticLink';
import screens from '../../../../../navigation/screens';
import { parseAnalytics } from '../../../utils';

const AnalyticsGeneral = () => {
  const renderStaticColumn = (value, filterParams, resource, screen) => [
    value,
    <AnalyticLink value={value} resource={resource} screen={screen} filterParams={filterParams} />
  ];

  const rows = [
    {
      key: 'fieldsCount',
      dataIndex: 'fieldsCount',
      name: i18n.t('analytics.generals.fieldsCount'),
      background: true,
      render: (_, record) => {
        const {
          fields: { fieldsCount: value }
        } = record;

        return renderStaticColumn(value, record.filterParams, 'fields', screens.Fields);
      }
    },
    {
      key: 'fieldsTillableArea',
      dataIndex: 'fieldsTillableArea',
      name: i18n.t('analytics.generals.fieldsTillableArea'),
      background: true,
      render: (_, record) => {
        const {
          fields: { fieldsTillableArea: value }
        } = record;

        return renderStaticColumn(value, record.filterParams, 'fields', screens.Fields);
      }
    },
    {
      key: 'landsCount',
      dataIndex: 'landsCount',
      name: i18n.t('analytics.generals.landsCount'),
      background: false,
      render: (_, record) => {
        const {
          lands: { landsCount: value }
        } = record;

        return renderStaticColumn(value, record.filterParams, 'lands', screens.Lands);
      }
    },
    {
      key: 'landsArea',
      dataIndex: 'landsArea',
      name: i18n.t('analytics.generals.landsArea'),
      background: false,
      render: (_, record) => {
        const {
          lands: { landsArea: value }
        } = record;

        return renderStaticColumn(value, record.filterParams, 'lands', screens.Lands);
      }
    },
    {
      key: 'landsPolygonArea',
      dataIndex: 'landsPolygonArea',
      name: i18n.t('analytics.generals.landsPolygonArea'),
      background: false,
      render: (_, record) => {
        const {
          lands: { landsPolygonArea: value }
        } = record;

        return renderStaticColumn(value, record.filterParams, 'lands', screens.Lands);
      }
    },
    {
      key: 'fieldsRentedAreaTotal',
      dataIndex: 'fieldsRentedAreaTotal',
      name: i18n.t('analytics.generals.fieldsRentedAreaTotal'),
      background: true,
      render: (_, record) => {
        const {
          fieldsRentedArea: { total: value }
        } = record;

        return renderStaticColumn(
          value,
          { ...record.filterParams, outside: false },
          'lands',
          screens.Lands
        );
      }
    },
    {
      key: 'fieldsRentedAreaRent',
      dataIndex: 'fieldsRentedAreaRent',
      background: true,
      name: i18n.t('analytics.generals.rent'),
      render: (_, record) => {
        const {
          fieldsRentedArea: { rent: value }
        } = record;

        return renderStaticColumn(
          value,
          {
            ...record.filterParams,
            outside: false,
            landAgreementsSubType: 1,
            landAgreementsTypes: [2, 5, 1]
          },
          'lands',
          screens.Lands
        );
      }
    },
    {
      key: 'fieldsRentedAreaExchange',
      dataIndex: 'fieldsRentedAreaExchange',
      background: true,
      name: i18n.t('analytics.generals.exchange'),
      render: (_, record) => {
        const {
          fieldsRentedArea: { exchange: value }
        } = record;

        return renderStaticColumn(
          value,
          {
            ...record.filterParams,
            outside: false,
            landAgreementsSubType: 1,
            landAgreementsTypes: [3]
          },
          'lands',
          screens.Lands
        );
      }
    },
    {
      key: 'fieldsRentedAreaWithoutAgreements',
      dataIndex: 'fieldsRentedAreaWithoutAgreements',
      background: true,
      name: i18n.t('analytics.generals.withoutAgreements'),
      render: (_, record) => {
        const {
          fieldsRentedArea: { withoutAgreements: value }
        } = record;

        return renderStaticColumn(
          value,
          {
            ...record.filterParams,
            outside: false,
            withoutAgreements: true
          },
          'lands',
          screens.Lands
        );
      }
    },
    {
      key: 'fieldsNotRentedArea',
      dataIndex: 'fieldsNotRentedArea',
      background: false,
      name: i18n.t('analytics.generals.fieldsNotRentedArea'),
      render: (value, record) =>
        renderStaticColumn(
          value,
          { ...record.filterParams, withoutPaint: true },
          'fields',
          screens.Fields
        )
    },
    {
      key: 'fieldsRentedOutsideAreaTotal',
      dataIndex: 'fieldsRentedOutsideAreaTotal',
      background: true,
      name: i18n.t('analytics.generals.fieldsRentedOutsideAreaTotal'),
      render: (_, record) => {
        const {
          fieldsRentedOutsideArea: { total: value }
        } = record;

        return renderStaticColumn(
          value,
          {
            ...record.filterParams,
            intersectionArea: true
          },
          'lands',
          screens.Lands
        );
      }
    },
    {
      key: 'fieldsRentedOutsideAreaRent',
      dataIndex: 'fieldsRentedOutsideAreaRent',
      background: true,
      name: i18n.t('analytics.generals.rent'),
      render: (_, record) => {
        const {
          fieldsRentedOutsideArea: { rent: value }
        } = record;

        return renderStaticColumn(
          value,
          {
            ...record.filterParams,
            intersectionArea: true,
            landAgreementsSubType: 1,
            landAgreementsTypes: [2, 5, 1]
          },
          'lands',
          screens.Lands
        );
      }
    },
    {
      key: 'fieldsRentedOutsideAreaExchange',
      dataIndex: 'fieldsRentedOutsideAreaExchange',
      background: true,
      name: i18n.t('analytics.generals.exchange'),
      render: (_, record) => {
        const {
          fieldsRentedOutsideArea: { exchange: value }
        } = record;

        return renderStaticColumn(
          value,
          {
            ...record.filterParams,
            intersectionArea: true,
            landAgreementsSubType: 1,
            landAgreementsTypes: [3]
          },
          'lands',
          screens.Lands
        );
      }
    },
    {
      key: 'fieldsRentedOutsideWithoutAgreements',
      dataIndex: 'fieldsRentedOutsideWithoutAgreements',
      background: true,
      name: i18n.t('analytics.generals.withoutAgreements'),
      render: (_, record) => {
        const {
          fieldsRentedOutsideArea: { withoutAgreements: value }
        } = record;

        return renderStaticColumn(
          value,
          {
            ...record.filterParams,
            intersectionArea: true,
            withoutAgreements: true
          },
          'lands',
          screens.Lands
        );
      }
    }
  ];

  return (
    <AnalyticPage
      rows={rows}
      apiURL="/api/v1/dashboard/statistics/general"
      transformEntities={entities => parseAnalytics(entities)}
    />
  );
};

export default AnalyticsGeneral;
