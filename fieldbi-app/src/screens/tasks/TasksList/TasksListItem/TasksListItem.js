import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getFormattedDate } from '../../../../helpers';
import UserInfo from '../../../../components/user/UserInfo';
import UserIcons from '../../../../components/user/UserIcons';
import TagsList from '../../../../components/tags/TagsList';
import TaskFields from '../../TaskFields';
import { COLORS } from '../../../../constants';
import { getCurrentStatus } from '../../config';

const TasksListItem = props => {
  const { entitie } = props;

  const currentStatus = getCurrentStatus(entitie.status);

  const items = [
    {
      title: i18n.t('tasks.responsible'),
      key: 'responsible',
      content: <UserInfo user={entitie.responsible} />
    },
    {
      title: i18n.t('tasks.author'),
      key: 'author',
      content: <UserInfo user={entitie.author} />
    },
    {
      title: entitie.observers.length === 1 ? i18n.t('tasks.observer') : i18n.t('tasks.observers'),
      key: 'observers',
      content: <UserIcons users={entitie.observers} />
    },
    {
      title: entitie.tags.length === 1 ? i18n.t('tasks.tag') : i18n.t('tasks.tags'),
      key: 'tags',
      content: <TagsList tags={entitie.tags} />
    }
  ];

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <View style={styles.titleView}>
          <View
            style={{
              ...styles.statusPoint,
              backgroundColor: currentStatus.color
            }}
          />
          <Text style={styles.title} numberOfLines={1}>
            {entitie.title}
          </Text>
        </View>
        <View style={styles.date}>
          <Icon name="date-range" size={12} color={COLORS.LIGHT} style={{ lineHeight: 18 }} />
          <Text style={styles.dateFont}>{getFormattedDate(entitie.deadline)}</Text>
        </View>
      </View>
      <TaskFields fields={items} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: COLORS.GREY_BG,
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: '#fff',
    borderBottomWidth: 4,
    borderStyle: 'solid'
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12
  },
  statusPoint: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginRight: 6
  },
  titleView: {
    paddingRight: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    flex: 1
  },
  date: {
    flexDirection: 'row'
  },
  dateFont: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.LIGHT,
    marginLeft: 4
  }
});

TasksListItem.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default TasksListItem;
