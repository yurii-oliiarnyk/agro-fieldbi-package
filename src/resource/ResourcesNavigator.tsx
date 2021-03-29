import React, { ReactNode } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationOptions } from '../navigation/styles';
import { DrawerButton } from '../navigation/DrawerNavigation';
import { ResourceListWrapper } from './ResourcesList/ResourcesListWrapper';
import { ResourceShow } from './ResourcesShow/ResourceShow';
import ResourcesListFilter from './ResourcesList/ResourcesListFilter/ResourcesListFilter';

const Stack = createStackNavigator();

type ResourcesNavigatorTypes = {
  name: string;
  nameField?: string;
  listOptions: {
    headerTitle: string;
    renderItem: (item: any) => ReactNode;
    labels: {
      empty: string;
      search: string;
    };
  };
  filterOptions?: {
    headerTitle: string;
    renderScreen: () => ReactNode;
  };
  showOptions?: {
    renderScreen: (entity: any) => ReactNode;
    scrollable?: boolean;
  };
};

export const ResourcesNavigator: React.FC<ResourcesNavigatorTypes> = props => {
  const { name, nameField = 'name', listOptions, filterOptions, showOptions } = props;

  return (
    <Stack.Navigator {...stackNavigationOptions}>
      <Stack.Screen
        name={`${name}-list`}
        options={{
          headerTitle: listOptions.headerTitle,
          headerLeft: buttonProps => <DrawerButton tintColor={buttonProps.tintColor} />,
        }}
      >
        {listScreenProps => (
          <ResourceListWrapper
            {...listScreenProps}
            showScreen={!!showOptions}
            filterScreen={!!filterOptions}
            name={name}
            nameField={nameField}
            labels={listOptions.labels}
            renderItem={listOptions.renderItem}
          />
        )}
      </Stack.Screen>
      {filterOptions && (
        <Stack.Screen name={`${name}-filter`} options={{ headerTitle: filterOptions.headerTitle }}>
          {filterStackProps => (
            <ResourcesListFilter name={name} {...filterStackProps}>
              {filterOptions.renderScreen()}
            </ResourcesListFilter>
          )}
        </Stack.Screen>
      )}
      {showOptions && (
        <Stack.Screen
          name={`${name}-show`}
          options={({ route }) => {
            const params = (route.params || {}) as { title?: string };
            const headerTitle = params.title;

            return {
              headerTitle,
            };
          }}
        >
          {showScreenProps => (
            <ResourceShow name={name} scrollable={showOptions.scrollable} {...showScreenProps}>
              {entity => showOptions.renderScreen(entity)}
            </ResourceShow>
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
