import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';
import UserIcons from '../../../components/user/UserIcons';
import UserInfo from '../../../components/user/UserInfo';
import TagsList from '../../../components/tags/TagsList';
import Comments from '../../../components/comments/Comments';
import AppHTMLViewer from '../../../components/UI/AppHTMLViewer';
import TaskFields from '../TaskFields';
import { getFormattedDate, getFormattedTimeDate, openURL } from '../../../helpers';
import AppLink from '../../../components/UI/AppLink';
import TasksStatusSelect from '../TasksStatusSelect';

const TasksShow = props => {
  const { entitie } = props;

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
    },
    {
      title: i18n.t('tasks.createdAt'),
      key: 'createdAt',
      content: <Text>{getFormattedTimeDate(entitie.createdAt)}</Text>
    },
    {
      title: i18n.t('tasks.deadline'),
      key: 'deadline',
      content: <Text>{getFormattedDate(entitie.deadline)}</Text>
    },
    {
      title: i18n.t('tasks.link'),
      key: 'link',
      style: {
        width: '100%'
      },
      content: (
        <AppLink onPress={() => openURL(entitie.link)} fontSize={12} type="primary">
          {entitie.link}
        </AppLink>
      )
    }
  ];

  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={styles.head}>
        <View style={styles.title}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{entitie.title}</Text>
          </View>
          <View style={{ width: 150 }}>
            <TasksStatusSelect value={entitie.status} id={entitie.id} />
          </View>
        </View>
        <TaskFields fields={items} />
      </View>
      <View style={{ paddingTop: 24, paddingBottom: 32 }}>
        <AppHTMLViewer content={entitie.description} />
      </View>
      <Comments url={`/api/v1/tasks/${entitie.id}/comments`} entityData={{ task: entitie.id }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    paddingRight: 16
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18
  },
  head: {
    backgroundColor: '#F5F5F5',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 4
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  }
});

TasksShow.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(TasksShow);
