import React from 'react';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { getDynamicRows, parseAnalytics } from '../../utils';
import AppTabs from '../../../../components/AppTabs';
import AnalyticPage from '../AnalyticPage';
import AnalyticLink from '../AnalyticLink';

const AnalyticsTabs = props => {
  const {
    countURL,
    areaURL,
    staticCountColumns,
    staticAreaColumns,
    linkConfig,
    renderColumnLink
  } = props;

  const countTab = {
    rows: analytics => [
      ...staticCountColumns,
      ...getDynamicRows(analytics, 'relationsCounts', 'count', linkConfig, renderColumnLink)
    ],
    id: 'count',
    name: i18n.t('analytics.tabs.count'),
    apiURL: countURL,
    transformEntities: entities => parseAnalytics(entities, 'relationsCounts', 'count')
  };

  const areaTab = {
    rows: analytics => [
      ...staticAreaColumns,
      ...getDynamicRows(analytics, 'relationsArea', 'area', linkConfig, renderColumnLink)
    ],
    id: 'area',
    name: i18n.t('analytics.tabs.area'),
    apiURL: areaURL,
    transformEntities: entities => parseAnalytics(entities, 'relationsArea', 'area')
  };

  return (
    <AppTabs
      locked
      data={[countTab, areaTab]}
      keyExtractor={tab => tab.id}
      renderName={tab => tab.name}
      renderTab={tab => <AnalyticPage {...tab} />}
      scrollableTabs={false}
      scrollableContent={false}
    />
  );
};

AnalyticsTabs.defaultProps = {
  staticAreaColumns: [],
  staticCountColumns: [],
  renderColumnLink: (value, filterParams = {}, config) => {
    const { filterKey, resource, valueKey, screen } = config;

    const params = {
      ...filterParams
    };

    if (value.id) {
      params[filterKey] = value.id;
    }

    return (
      <AnalyticLink
        screen={screen}
        value={value[valueKey]}
        resource={resource}
        filterParams={params}
      />
    );
  }
};

AnalyticsTabs.propTypes = {
  linkConfig: PropTypes.object,
  countURL: PropTypes.string.isRequired,
  areaURL: PropTypes.string.isRequired,
  staticCountColumns: PropTypes.array,
  staticAreaColumns: PropTypes.any,
  renderColumnLink: PropTypes.func
};

export default AnalyticsTabs;
