import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import moment from 'moment';
import TaskboardPlate from '../../components/TaskboardPlate';
import TaskboardPlateItem from '../../components/TaskboardPlateItem';
import TaskboardPlateUser from '../../components/TaskboardPlateUser';
import { getObjectFromArrayOfObject } from '../../../../helpers';
import { changelogConfix } from './config';

const getCurrentMonth = () => {
  const currentMonth = moment().format('MMMM');

  return currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
};

const parsedStatistics = statistics => {
  const { users = [] } = getObjectFromArrayOfObject(statistics.activities);
  const { entities = [] } = getObjectFromArrayOfObject(statistics.entities);

  return {
    users,
    entities
  };
};

const TaskboardActivities = props => {
  const { statistics } = props;

  const { users, entities } = parsedStatistics(statistics);

  return (
    <TaskboardPlate
      title={i18n.t('taskboard.users.name')}
      subtitle={i18n.t('taskboard.users.subtitle')}
      value={getCurrentMonth()}
      color="#359533"
      id="activities"
    >
      {users.length > 0 && (
        <>
          <View style={styles.subtitleView}>
            <Text style={styles.subtitleText}>{i18n.t('taskboard.users.userActivities')}</Text>
          </View>
          {users.map((user, key) => {
            return (
              <TaskboardPlateUser
                last={key === users.length - 1}
                value={user.activity}
                user={user}
                key={user.id}
              />
            );
          })}
        </>
      )}
      {entities.length > 0 && (
        <>
          <View style={[styles.subtitleView, { marginTop: 12 }]}>
            <Text style={styles.subtitleText}>{i18n.t('taskboard.users.userEntities')}</Text>
          </View>
          {entities.map((entity, key) => {
            const last = key === entities.length - 1;

            return (
              <TaskboardPlateItem
                key={entity.entity}
                last={last}
                title={changelogConfix[entity.entity] ?? entity.entity}
                value={{
                  count: entity.count,
                  unit: i18n.t('taskboard.users.actions', { count: entity.count % 10 })
                }}
              />
            );
          })}
        </>
      )}
      {users.length === 0 && entities.length === 0 && (
        <View style={styles.subtitleView}>
          <Text style={styles.subtitleText}>{i18n.t('taskboard.users.notActions')}</Text>
        </View>
      )}
    </TaskboardPlate>
  );
};

const styles = StyleSheet.create({
  subtitleView: {
    marginBottom: 4
  },
  subtitleText: {
    fontWeight: 'bold'
  }
});

TaskboardActivities.propTypes = {
  statistics: PropTypes.object.isRequired
};

export default TaskboardActivities;
