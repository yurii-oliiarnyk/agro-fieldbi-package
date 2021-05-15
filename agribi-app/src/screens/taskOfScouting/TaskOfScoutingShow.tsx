import React from 'react';
import { ScrollView, Text, useWindowDimensions } from 'react-native';
import i18n from 'i18n-js';
import { TaskOfScoutingType, TaskType } from '../../types/taskOfScouting';
import { ResourceTable, getFormattedDate, COLORS, ResourceMap, FieldMapLayer } from 'agro-package';
import Icons from 'react-native-vector-icons/AntDesign';
import { Table } from '../../UI/Table/Table';
import { MapPoints } from '../../components/MapPoints';

type TaskOfScoutingShowTypes = {
  entity: TaskOfScoutingType;
};

const STATUS_NEW = 0;
const STATUS_IN_WORK = 1;
const STATUS_REJECTED = 2;
const STATUS_DONE = 2;

const getStatusName = (status: number) => {
  switch (status) {
    case STATUS_NEW: {
      return i18n.t('taskOfScout.statuses.new');
    }

    case STATUS_IN_WORK: {
      return i18n.t('taskOfScout.statuses.inWork');
    }

    case STATUS_REJECTED: {
      return i18n.t('taskOfScout.statuses.rejected');
    }

    case STATUS_DONE: {
      return i18n.t('taskOfScout.statuses.done');
    }
  }
};

export const TaskOfScoutingShow: React.FC<TaskOfScoutingShowTypes> = props => {
  const { entity } = props;

  const { height } = useWindowDimensions();

  const data = [
    {
      name: i18n.t('taskOfScout.dateCreation'),
      value: getFormattedDate(entity.dateCreation),
      key: 'dateCreation',
    },
    {
      name: i18n.t('taskOfScout.dateExecution'),
      value: getFormattedDate(entity.dateExecution),
      key: 'dateExecution',
    },
    {
      name: i18n.t('taskOfScout.status'),
      value: getStatusName(entity.status),
      key: 'status',
    },
    {
      name: i18n.t('taskOfScout.subdvision'),
      value: entity.field.shortSubdivisionData?.name,
      key: 'subdvision',
    },
    {
      name: i18n.t('taskOfScout.field'),
      value: entity.field.name,
      key: 'field',
    },
    {
      name: i18n.t('taskOfScout.author'),
      value: entity.author.name,
      key: 'author',
    },
    {
      name: i18n.t('taskOfScout.executant'),
      value: entity.executant.name,
      key: 'executant',
    },
    {
      name: i18n.t('taskOfScout.alternateExecutor'),
      value: entity.alternateExecutor?.name ?? i18n.t('generals.noDataSymbol'),
      key: 'alternateExecutor',
    },
    {
      name: i18n.t('taskOfScout.comment'),
      value: entity.comment ?? i18n.t('generals.noDataSymbol'),
      key: 'comment',
    },
  ];

  return (
    <>
      <ResourceMap coordinates={entity.polygon}>
        {({ layerStyle }) => (
          <>
            <FieldMapLayer layerStyle={layerStyle} field={{ coordinates: entity.polygon }} />
            <MapPoints
              points={entity.tasksList.map(task => ({
                coordinates: task.point,
                id: task.id,
              }))}
            />
          </>
        )}
      </ResourceMap>
      <ScrollView style={{ height: height - 300 }}>
        <ResourceTable data={data} />
        <Table<TaskType>
          nameColumnWidth={120}
          valueColumnWidth={140}
          dataSource={entity.tasksList}
          scrollable={false}
          rows={[
            {
              dataIndex: 'id',
              key: 'id',
              render: (_, __, index) => index + 1,
            },
            {
              dataIndex: 'scoutingType',
              key: 'scoutingType',
              name: 'Вид скаутингу',
              render: scoutingType => scoutingType.name,
            },
            {
              dataIndex: 'scoutingType',
              key: 'analysisIndicators',
              name: 'Показники діагнозтики',
              render: scoutingType =>
                scoutingType.analysisIndicators.map(indicator => (
                  <Text key={indicator.id}>{indicator.name}</Text>
                )),
            },
            {
              dataIndex: 'withPhoto',
              key: 'withPhoto',
              name: 'Потрабні фото',
              render: withPhone => {
                if (withPhone) {
                  return <Icons name="check" style={{ fontSize: 21 }} color={COLORS.MAIN} />;
                }

                return <Icons name="close" style={{ fontSize: 21 }} color="red" />;
              },
            },
            {
              dataIndex: 'scoutingType',
              key: 'numberOfPhotosRequired',
              name: 'Кількість фото',
              render: (scoutingType, record) =>
                record.withPhoto
                  ? scoutingType.numberOfPhotosRequired
                  : i18n.t('generals.noDataSymbol'),
            },
            {
              dataIndex: 'point',
              key: 'longitude',
              name: 'Довгота',
              render: point => point[0].toFixed(6),
            },
            {
              dataIndex: 'point',
              key: 'latitude',
              name: 'Широта',
              render: point => point[1].toFixed(6),
            },
            {
              dataIndex: 'scoutingType',
              key: 'instructions',
              name: 'Опис завдання',
              render: scoutingType => {
                let { instructions = '' } = scoutingType;

                const regex = /(<([^>]+)>)/gi;
                instructions = String(instructions).replace(regex, '');

                return instructions ?? i18n.t('generals.noDataSymbol');
              },
            },
          ]}
        />
      </ScrollView>
    </>
  );
};
