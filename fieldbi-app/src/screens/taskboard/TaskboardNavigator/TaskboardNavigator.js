import React from 'react';
import i18n from 'i18n-js';
import { createStackNavigator } from '@react-navigation/stack';
import screens from '../../../navigation/screens';
import { stackNavigationOptions } from '../../../navigation/styles';
import Taskboard from '../Taskboard';
import TaskboardFilter from '../TaskboardFilter';
import DrawerButton from '../../../navigation/Drawer/DrawerButton';

const Stack = createStackNavigator();

const TaskboardNavigator = () => {
  return (
    <Stack.Navigator {...stackNavigationOptions}>
      <Stack.Screen
        name={screens.Taskboard}
        component={Taskboard}
        options={{
          headerTitle: i18n.t('pages.taskboard'),
          headerLeft: props => <DrawerButton {...props} />
        }}
      />
      <Stack.Screen
        options={{
          headerTitle: i18n.t('taskboard.filter.selectSubdivion')
        }}
        name={screens.TaskboardFilter}
        component={TaskboardFilter}
      />
    </Stack.Navigator>
  );
};

export default TaskboardNavigator;
