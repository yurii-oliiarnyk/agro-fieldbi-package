import React from 'react';
import i18n from 'i18n-js';
import { ScrollView, useWindowDimensions } from 'react-native';
import { ResourceMap, FieldMapLayer, ResourceTable, getFormattedTimeDate } from 'agro-package';
import { ScoutingReportType } from '../../types/scoutingReports';
import { MapPoints } from '../../components/MapPoints';
import { ScoutingReportsTabs } from './ScoutingReportsTabs';
import { ImageList } from '../../UI/ImagePicker/ImageList';

type ScoutingReportsShowProps = {
  entity: ScoutingReportType;
};

const renderAnalysisByType = (type, value) => {
  switch (type) {
    case 3: {
      return value ? i18n.t('generals.yes') : i18n.t('generals.no');
    }

    default:
      return value ?? i18n.t('generals.noDataSymbol');
  }
};

export const ScoutingReportsShow: React.FC<ScoutingReportsShowProps> = props => {
  const { entity } = props;

  const { height } = useWindowDimensions();

  return (
    <>
      <ResourceMap coordinates={entity.fieldContour.polygon}>
        {({ layerStyle }) => (
          <>
            <FieldMapLayer
              layerStyle={layerStyle}
              field={{ coordinates: entity.fieldContour.polygon }}
            />
            <MapPoints
              points={entity.points.map((point, index) => ({
                coordinates: point.point,
                id: index + 1,
              }))}
            />
          </>
        )}
      </ResourceMap>
      <ScrollView style={{ height: height - 300 }}>
        <ResourceTable
          data={[
            {
              name: i18n.t('scoutingReport.field'),
              value: entity.field.name,
              key: 'field',
            },
            {
              name: i18n.t('scoutingReport.date'),
              value: getFormattedTimeDate(entity.date),
              key: 'date',
            },
          ]}
        />
        <ScoutingReportsTabs
          tabs={entity.points}
          render={index => {
            const currentPoint = entity.points[index];

            return (
              <>
                <ImageList
                  images={currentPoint.photos.map(photo => ({
                    uri: photo.photo,
                    key: photo.photo,
                  }))}
                />

                <ResourceTable
                  data={[
                    {
                      name: 'Коментар',
                      value: currentPoint.comment,
                      key: 'comment',
                    },
                    ...currentPoint.analyses.map(analys => ({
                      name: analys.analysisIndicator.name,
                      key: analys.id,
                      value: renderAnalysisByType(analys.analysisIndicator.type, analys.value),
                    })),
                  ]}
                />
              </>
            );
          }}
        />
      </ScrollView>
    </>
  );
};
