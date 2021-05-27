import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import TaskboardPlate from '../../components/TaskboardPlate';
import TaskboardPlateItem from '../../components/TaskboardPlateItem';
import screens from '../../../../navigation/screens';

const TaskboardFields = props => {
  const { statistics, filter } = props;

  return (
    <TaskboardPlate
      title={i18n.t('taskboard.fields.name')}
      subtitle={i18n.t('taskboard.fields.subtitle')}
      value={statistics.total}
      valueUnit={i18n.t('taskboard.fields.unit')}
      color="#18517b"
      id="fields"
    >
      <TaskboardPlateItem
        title={i18n.t('taskboard.noСontours')}
        value={{
          count: statistics.countOfFieldsWithoutPolygon,
          unit: i18n.t('taskboard.fields.unit')
        }}
        linkParams={{
          resource: 'fields',
          screen: screens.Fields,
          filterBy: {
            withoutPolygon: true,
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.fields.intersectionPercentage')}
        valueSeparator="/"
        value={[
          {
            count: statistics.hasIntersectionWithLandsPercentage,
            key: 'hasIntersectionWithLandsPercentage',
            unit: '%'
          },
          {
            count: statistics.hasNoIntersectionWithLandsPercentage,
            key: 'hasNoIntersectionWithLandsPercentage',
            unit: '%'
          }
        ]}
      />
    </TaskboardPlate>
  );
};

TaskboardFields.propTypes = {
  statistics: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired
};

export default TaskboardFields;
