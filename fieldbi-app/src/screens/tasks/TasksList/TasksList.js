import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import ResourcesList from '../../../components/resource/ResourcesList';
import TasksListItem from './TasksListItem';
import screens from '../../../navigation/screens';
import IconTasks from '../../../assets/icons/IconTasks';
import IconAuthor from '../../../assets/icons/IconAuthor';
import IconResponsible from '../../../assets/icons/IconResponsible';
import IconObserver from '../../../assets/icons/IconObserver';
import AppBottomBar from '../../../components/UI/AppBottomBar';
import { filterResource } from '../../../store/resource/resource';
import { moduleName } from '../../../store/auth/auth';

const TasksList = () => {
  const { navigate } = useNavigation();

  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();
  const filterBy = useSelector(state => state.tasks.filterBy);
  const filterObj = JSON.parse(filterBy);
  const user = useSelector(state => state[moduleName].user);

  const changeFilter = filterObj => {
    const filterBy = JSON.stringify(filterObj);
    dispatch(filterResource('tasks')(filterBy));
  };

  useEffect(() => {
    const activeIndex = ['all', 'author', 'responsible', 'observers'].findIndex(item => {
      return filterObj[item] && filterObj[item][0] === user.id;
    });

    if (activeIndex !== -1 && activeIndex !== current) {
      setCurrent(activeIndex);
    }
  }, [filterBy]);

  const updateFilter = updatedUserProp => {
    const updatedFilter = { ...filterObj };

    ['author', 'observers', 'responsible'].forEach(item => {
      delete updatedFilter[item];
    });

    if (updatedUserProp) {
      updatedFilter[updatedUserProp] = [user.id];
    }

    changeFilter(updatedFilter);
  };

  const navConfig = [
    {
      id: 'all',
      label: 'Всі завдання',
      icon: <IconTasks />,
      onSelect: () => updateFilter()
    },
    {
      id: 'author',
      label: 'Автор',
      icon: <IconAuthor />,
      onSelect: () => updateFilter('author')
    },
    {
      id: 'responsible',
      label: 'Відповідальний',
      icon: <IconResponsible />,
      onSelect: () => updateFilter('responsible')
    },
    {
      id: 'observers',
      label: 'Спостерігач',
      icon: <IconObserver />,
      onSelect: () => updateFilter('observers')
    }
  ];

  return (
    <>
      <ResourcesList
        name="tasks"
        renderItem={entitie => <TasksListItem entitie={entitie} />}
        onItemPress={item => {
          navigate({
            name: screens.TasksShow,
            params: {
              title: item.title,
              resourceName: 'tasks',
              entitieId: item.id
            }
          });
        }}
        onFilterPress={() => {
          navigate({
            name: screens.TasksFilter,
            params: {
              resourceName: 'tasks'
            }
          });
        }}
        labels={{
          search: i18n.t('tasks.listName'),
          empty: i18n.t('tasks.notFound')
        }}
      />
      <AppBottomBar tabs={navConfig} active={current} setActive={setCurrent} />
    </>
  );
};

export default TasksList;
