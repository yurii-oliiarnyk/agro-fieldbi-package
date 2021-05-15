import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import i18n from 'i18n-js';
import { TaskOfScoutingType } from '../../types/taskOfScouting';
import {
  ResourcesListItem,
  ResourcesListItemContour,
  ResourcesListItemInfo,
  ResourcesListItemName,
  COLORS,
  getFormattedDate,
} from 'agro-package';

type TaskOfScoutingListItemTypes = {
  entity: TaskOfScoutingType;
};

const styles = StyleSheet.create({
  status: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: COLORS.GREY,
    marginLeft: 8,
  },
});

const getStatusColor = (date: number) => {
  const parsedData = moment.unix(date);
  const current = moment();
  const isBefore = current.isBefore(parsedData, 'day');

  if (isBefore) {
    return '#1ED700'; // green
  }

  const isAfter = current.isAfter(parsedData, 'day');

  if (isAfter) {
    return '#F64A4A'; // red
  }

  return '#FFD800'; // yellow
};

export const TaskOfScoutingListItem: React.FC<TaskOfScoutingListItemTypes> = props => {
  const { entity } = props;

  const statusColor = getStatusColor(entity.dateExecution);

  console.log(i18n.t('ui.back'));

  return (
    <ResourcesListItem
      MainComponent={
        <>
          <ResourcesListItemName name={entity.field.name} />
          <ResourcesListItemInfo
            name={i18n.t('taskOfScout.dateExecution')}
            value={getFormattedDate(entity.dateExecution)}
          />
        </>
      }
      RightComponent={<View style={[styles.status, { backgroundColor: statusColor }]} />}
      LeftComponent={<ResourcesListItemContour coordinates={entity.polygon} color="#1ED700" />}
    />
  );
};
