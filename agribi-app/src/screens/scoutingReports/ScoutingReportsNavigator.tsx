import React from 'react';
import i18n from 'i18n-js';
import { ResourcesNavigator } from 'agro-package';
import { ScoutingReportType } from '../../types/scoutingReports';
import { ScoutingReportsListItem } from './ScoutingReportsListItem';
import { ScoutingReportsShow } from './ScoutingReportsShow';
import { ScoutingReportsCreate } from './ScoutingReportsCreate';
import { ScoutingReportsEdit } from './ScoutingReportsEdit';

export const ScoutingReportsNavigator = (): JSX.Element => {
  return (
    <ResourcesNavigator
      name="agro/scouting-reports"
      nameField="field.name"
      loadFullEntity
      listOptions={{
        headerTitle: i18n.t('scoutingReport.name'),
        labels: {
          empty: i18n.t('scoutingReport.notFound'),
          search: i18n.t('scoutingReport.listName'),
        },
        renderItem: (entity: ScoutingReportType) => <ScoutingReportsListItem entity={entity} />,
      }}
      showOptions={{
        renderScreen: entity => <ScoutingReportsShow entity={entity} />,
      }}
      editOptions={{
        headerTitle: 'Редагування',
        labels: {
          submitting: 'Збереження звіту',
          success: 'Звіт збережено успішно',
        },
        renderScreen: props => <ScoutingReportsEdit {...props} />,
      }}
      createOptions={{
        headerTitle: i18n.t('scoutingReport.create'),
        hideButton: true,
        labels: {
          submitting: 'Збереження звіту',
          success: 'Звіт збережено успішно',
        },
        renderScreen: props => <ScoutingReportsCreate {...props} name="agro/scouting-reports" />,
      }}
    />
  );
};
