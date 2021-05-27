import React from 'react';
import ResourceShowNavigator from '../../../components/resource/ResourcesShow/ResourceShowNavigator';
import TasksShow from '../TasksShow';
import screens from '../../../navigation/screens';

const TasksShowNavigator = () => {
  const config = [
    {
      screenName: screens.TasksShowDetails,
      screen: TasksShow,
      label: 'details'
    }
  ];

  return <ResourceShowNavigator screens={config} />;
};

export default TasksShowNavigator;
