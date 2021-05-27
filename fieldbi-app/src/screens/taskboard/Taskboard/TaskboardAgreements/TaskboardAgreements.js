import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import moment from 'moment';
import TaskboardPlate from '../../components/TaskboardPlate';
import TaskboardPlateItem from '../../components/TaskboardPlateItem';
import screens from '../../../../navigation/screens';
import { FILTER_DATE_FORMAT } from '../../../../config';

const TaskboardAgreements = props => {
  const { statistics, filter } = props;

  return (
    <TaskboardPlate
      title={i18n.t('taskboard.agreements.name')}
      subtitle={i18n.t('taskboard.agreements.subtitle')}
      value={statistics.total}
      valueUnit={i18n.t('taskboard.agreements.unitShort')}
      color="#ab213a"
      id="agreements"
    >
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.countOfOverdueAgreements')}
        value={[
          {
            count: statistics.areaOfOverdueAgreements,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countOfOverdueAgreements,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
        linkParams={{
          resource: 'agreements',
          screen: screens.Agreements,
          filterBy: {
            validByDateLast: true,
            validByDate: {
              to: moment()
                .endOf('day')
                .format(FILTER_DATE_FORMAT)
            },
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.countOfAgreementsThatEndThisYear')}
        value={[
          {
            count: statistics.areaOfAgreementsThatEndThisYear,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countOfAgreementsThatEndThisYear,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
        linkParams={{
          resource: 'agreements',
          screen: screens.Agreements,
          filterBy: {
            agreementsEndYear: true,
            validByDate: {
              to: moment()
                .endOf('year')
                .format(FILTER_DATE_FORMAT),
              from: moment()
                .startOf('day')
                .add(1, 'day')
                .format(FILTER_DATE_FORMAT)
            },
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.receivedInExchange')}
        value={[
          {
            count: statistics.areaReceivedInExchange,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countReceivedInExchange,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
        linkParams={{
          resource: 'agreements',
          screen: screens.Agreements,
          filterBy: {
            subtype: 1,
            type: 3,
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.transferredInExchange')}
        value={[
          {
            count: statistics.areaTransferredInExchange,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countTransferredInExchange,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
        linkParams={{
          resource: 'agreements',
          screen: screens.Agreements,
          filterBy: {
            subtype: 2,
            type: 3,
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.acquiredOnEmphyteusis')}
        value={[
          {
            count: statistics.areaAcquiredOnEmphyteusis,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countAcquiredOnEmphyteusis,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
        linkParams={{
          resource: 'agreements',
          screen: screens.Agreements,
          filterBy: {
            subtype: 1,
            type: 5,
            ...filter
          }
        }}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.thereIsNoStateRegistration')}
        value={[
          {
            count: statistics.areaThereIsNoStateRegistration,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countThereIsNoStateRegistration,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.isAutomaticContinuationExist')}
        value={[
          {
            count: statistics.areaAutomaticContinuation,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countAutomaticContinuation,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.hasPurchaseLand')}
        value={[
          {
            count: statistics.areaHasPurchaseLand,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countHasPurchaseLand,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.documentLocationIsNull')}
        value={[
          {
            count: statistics.areaDocumentLocationIsNull,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countDocumentLocationIsNull,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
      />
      <TaskboardPlateItem
        title={i18n.t('taskboard.agreements.isNotCopyOfTheDocument')}
        value={[
          {
            count: statistics.areaIsNotCopyOfTheDocument,
            key: 'area',
            unit: i18n.t('taskboard.areaUnit')
          },
          {
            count: statistics.countIsNotCopyOfTheDocument,
            key: 'count',
            unit: i18n.t('taskboard.agreements.unit')
          }
        ]}
      />
    </TaskboardPlate>
  );
};

TaskboardAgreements.propTypes = {
  statistics: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired
};

export default TaskboardAgreements;
