import React from 'react';
import i18n from 'i18n-js';
import { ResourcesNavigator, FieldShowInfo, FieldsListItem, FieldFilter } from 'agro-package';

export const FieldsNavigator = (): JSX.Element => {
  return (
    <ResourcesNavigator
      name="fields"
      listOptions={{
        headerTitle: i18n.t('field.multiple'),
        labels: { empty: i18n.t('field.notFound'), search: i18n.t('field.listName') },
        renderItem: entitie => <FieldsListItem entitie={entitie} />,
      }}
      showOptions={{
        renderScreen: entitie => <FieldShowInfo entitie={entitie} />,
        scrollable: true,
      }}
      filterOptions={{
        headerTitle: 'Filter',
        renderScreen: () => <FieldFilter />,
      }}
    />
  );
};
