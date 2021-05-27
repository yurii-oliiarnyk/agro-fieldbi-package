import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import TaskboardPlate from '../../components/TaskboardPlate';
import TaskboardPlateItem from '../../components/TaskboardPlateItem';

const TaskboardCounterparties = props => {
  const { statistics } = props;

  return (
    <TaskboardPlate
      title={i18n.t('taskboard.counterparties.name')}
      subtitle={i18n.t('taskboard.counterparties.subtitle')}
      value={statistics.total}
      valueUnit={i18n.t('taskboard.counterparties.userUnit')}
      color="#166D5E"
      id="counterparties"
    >
      <TaskboardPlateItem
        title={i18n.t('taskboard.counterparties.isNoCopyOfTheTin')}
        value={{
          count: statistics.isNoCopyOfTheTin,
          unit: i18n.t('counterparty.count', { count: statistics.isNoCopyOfTheTin })
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.counterparties.noCopyOfPassport')}
        value={{
          count: statistics.noCopyOfPassport,
          unit: i18n.t('counterparty.count', { count: statistics.noCopyOfPassport })
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.counterparties.missingPhone')}
        value={{
          count: statistics.missingPhone,
          unit: i18n.t('counterparty.count', { count: statistics.missingPhone })
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.counterparties.noBankCard')}
        value={{
          count: statistics.noBankCard,
          unit: i18n.t('counterparty.count', { count: statistics.noBankCard })
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.counterparties.worksWithACompetitor')}
        value={{
          count: statistics.worksWithACompetitor,
          unit: i18n.t('counterparty.count', { count: statistics.worksWithACompetitor })
        }}
      />
      <TaskboardPlateItem
        last
        title={i18n.t('taskboard.counterparties.hasAnHeir')}
        value={{
          count: statistics.hasAnHeir,
          unit: i18n.t('counterparty.count', { count: statistics.hasAnHeir })
        }}
      />
    </TaskboardPlate>
  );
};

TaskboardCounterparties.propTypes = {
  statistics: PropTypes.object.isRequired
};

export default TaskboardCounterparties;
