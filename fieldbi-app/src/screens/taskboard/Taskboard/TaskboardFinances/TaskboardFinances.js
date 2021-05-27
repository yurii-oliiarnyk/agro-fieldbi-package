import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import TaskboardPlate from '../../components/TaskboardPlate';
import TaskboardPlateItem from '../../components/TaskboardPlateItem';

const TaskboardFinances = props => {
  const { statistics } = props;

  return (
    <TaskboardPlate
      title={i18n.t('taskboard.finances.name')}
      subtitle={i18n.t('taskboard.finances.subtitle')}
      value={statistics.total}
      valueUnit={i18n.t('generals.currencyUnits')}
      color="#3b3b8a"
      id="finances"
    >
      <TaskboardPlateItem
        title={i18n.t('taskboard.finances.averageSalaryPerHectare')}
        value={{ count: statistics.averageSumHectare, unit: i18n.t('generals.uahPerHectare') }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.finances.averageFeePerShare')}
        value={{ count: statistics.averageSumShare, unit: i18n.t('generals.uahPerShare') }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.finances.isDebtOnCounterparties')}
        value={{
          count: statistics.countCounterpartyOfDebt,
          unit: i18n.t('counterparty.count', { count: statistics.countCounterpartyOverpayment })
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.finances.isOverpaymentOnCounterparties')}
        value={{
          count: statistics.countCounterpartyOverpayment,
          unit: i18n.t('counterparty.count', { count: statistics.countCounterpartyOverpayment })
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.finances.amountOverpaymentRent')}
        value={{ count: statistics.totalRentOverpayment, unit: i18n.t('generals.currencyUnits') }}
      />
      <TaskboardPlateItem
        last
        title={i18n.t('taskboard.finances.counterpartiesHaveNoInitialBalances')}
        value={{
          count: statistics.haveNoInitialBalances,
          unit: i18n.t('counterparty.count', { count: statistics.countCounterpartyOverpayment })
        }}
      />
    </TaskboardPlate>
  );
};

TaskboardFinances.propTypes = {
  statistics: PropTypes.object.isRequired
};

export default TaskboardFinances;
