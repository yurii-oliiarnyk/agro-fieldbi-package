import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import TaskboardPlate from '../../components/TaskboardPlate';
import TaskboardPlateItem from '../../components/TaskboardPlateItem';
import screens from '../../../../navigation/screens';

const TaskboardLands = props => {
  const { statistics, filter } = props;

  return (
    <TaskboardPlate
      title={i18n.t('taskboard.lands.name')}
      subtitle={i18n.t('taskboard.lands.subtitle')}
      value={statistics.total}
      valueUnit={i18n.t('taskboard.lands.unitShort')}
      color="#d15f3a"
      id="lands"
    >
      <TaskboardPlateItem
        title={i18n.t('taskboard.noСontours')}
        value={[
          {
            count: statistics.landsWithoutPolygonArea,
            unit: i18n.t('taskboard.areaUnit'),
            key: 'area'
          },
          {
            count: statistics.countOfLandsWithoutPolygon,
            unit: i18n.t('taskboard.lands.unit'),
            key: 'count'
          }
        ]}
        linkParams={{
          resource: 'lands',
          screen: screens.Lands,
          filterBy: {
            withoutPolygon: true,
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.withoutSubdivision')}
        value={[
          {
            count: statistics.landsWithoutSubdivisionArea,
            unit: i18n.t('taskboard.areaUnit'),
            key: 'area'
          },
          {
            count: statistics.countOfLandsWithoutSubdivision,
            unit: i18n.t('taskboard.lands.unit'),
            key: 'count'
          }
        ]}
        linkParams={{
          resource: 'lands',
          screen: screens.Lands,
          filterBy: {
            subdivision: 0
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.lands.withoutCadastralNumber')}
        value={[
          {
            count: statistics.landsWithoutCadastralNumberArea,
            unit: i18n.t('taskboard.areaUnit'),
            key: 'area'
          },
          {
            count: statistics.countOfLandsWithoutCadastralNumber,
            unit: i18n.t('taskboard.lands.unit'),
            key: 'count'
          }
        ]}
        linkParams={{
          resource: 'lands',
          screen: screens.Lands,
          filterBy: {
            isCadastralNumberNotExists: true,
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.lands.withoutAgreements')}
        value={[
          {
            count: statistics.landsWithoutAgreementsArea,
            unit: i18n.t('taskboard.areaUnit'),
            key: 'area'
          },
          {
            count: statistics.countOfLandsWithoutAgreements,
            unit: i18n.t('taskboard.lands.unit'),
            key: 'count'
          }
        ]}
        linkParams={{
          resource: 'lands',
          screen: screens.Lands,
          filterBy: {
            withoutAgreements: true,
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.lands.areOwned')}
        value={[
          { count: statistics.landsAreaAreOwned, unit: i18n.t('taskboard.areaUnit'), key: 'area' },
          {
            count: statistics.landsCountAreOwned,
            unit: i18n.t('taskboard.lands.unit'),
            key: 'count'
          }
        ]}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.lands.noStateAct')}
        value={[
          {
            count: statistics.landsAreaThereIsNoStateAct,
            unit: i18n.t('taskboard.areaUnit'),
            key: 'area'
          },
          {
            count: statistics.landsCountThereIsNoStateAct,
            unit: i18n.t('taskboard.lands.unit'),
            key: 'count'
          }
        ]}
      />
      <TaskboardPlateItem
        last
        title={i18n.t('taskboard.lands.noExtract')}
        value={[
          { count: statistics.landsAreaNoExtract, unit: i18n.t('taskboard.areaUnit'), key: 'area' },
          {
            count: statistics.landsCountNoExtract,
            unit: i18n.t('taskboard.lands.unit'),
            key: 'count'
          }
        ]}
      />
    </TaskboardPlate>
  );
};

TaskboardLands.propTypes = {
  statistics: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired
};

export default TaskboardLands;
