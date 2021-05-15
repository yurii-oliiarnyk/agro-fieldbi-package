import React from 'react';
import i18n from 'i18n-js';
import { ResourcesNavigator } from 'agro-package';
import { TaskOfScoutingType } from '../../types/taskOfScouting';
import { TaskOfScoutingListItem } from './TaskOfScoutingListItem';
import { TaskOfScoutingShow } from './TaskOfScoutingShow';

export const TaskOfScoutingNavigator = (): JSX.Element => {
  return (
    <ResourcesNavigator
      name="agro/task-of-scout"
      nameField="field.name"
      listOptions={{
        headerTitle: i18n.t('taskOfScout.name'),
        labels: { empty: i18n.t('taskOfScout.notFound'), search: i18n.t('taskOfScout.listName') },
        renderItem: (entity: TaskOfScoutingType) => <TaskOfScoutingListItem entity={entity} />,
      }}
      showOptions={{
        renderScreen: (entity: TaskOfScoutingType) => <TaskOfScoutingShow entity={entity} />,
      }}
    />
  );
};
