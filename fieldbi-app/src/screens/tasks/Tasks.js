import React from 'react';
import i18n from 'i18n-js';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerButton from '../../navigation/Drawer/DrawerButton';

import { stackNavigationOptions } from '../../navigation/styles';
import screens from '../../navigation/screens';
import TasksList from './TasksList';
import TasksShowNavigator from './TasksShowNavigator';
import TasksFilter from './TasksFilter';

const Stack = createStackNavigator();

const Tasks = () => {
  return (
    <Stack.Navigator {...stackNavigationOptions}>
      <Stack.Screen
        name={screens.TasksList}
        component={TasksList}
        options={({ route }) => {
          return {
            headerTitle: 'Завдання',
            headerLeft: props => <DrawerButton {...props} />
          };
        }}
      />
      <Stack.Screen
        name={screens.TasksFilter}
        component={TasksFilter}
        options={{ headerTitle: i18n.t('ui.filter.title') }}
      />
      <Stack.Screen
        name={screens.TasksShow}
        component={TasksShowNavigator}
        options={({ route }) => {
          const headerTitle = route?.params?.title;

          return {
            headerTitle
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default Tasks;
