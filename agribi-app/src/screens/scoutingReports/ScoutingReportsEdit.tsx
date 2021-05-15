import React from 'react';
import { ScrollView } from 'react-native';
import { ResourceEdit } from 'agro-package';
import { ScoutingReportsCreatePoints } from './ScoutingReportsCreate/ScoutingReportsCreatePoints';
import { ScoutingReportsCommon } from './ScoutingReportsCreate/ScoutingReportsCommon';
import { useLoadImages } from './useLoadImages';

const getAnalysValueByType = (type: number, value: any) => {
  switch (type) {
    case 3: {
      return Boolean(value);
    }
    default:
      return value + '';
  }
};

export const ScoutingReportsEdit: React.FC = props => {
  const { loadPhoto, imagesLoading, loadedImages } = useLoadImages();

  const onSubmitHandler = async values => {
    const images = values.points.flatMap(point => point.photos);

    await loadPhoto(images);

    const response = {
      field: values.field?.id,
      date: values.date,
      comment: values.comment,
      points: values.points.map((pointData, index) => {
        return {
          photos: pointData.photos.map(image => ({
            photo: image.loaded ? image.uri : loadedImages.current[image.uri],
            point: image.point,
          })),
          comment: pointData.comment,
          name: `${index}`,
          analyses: pointData.analyses.map(analys => ({
            analysisIndicator: analys.id,
            value: getAnalysValueByType(analys.type, analys.value),
          })),
        };
      }),
    };

    return response;
  };

  return (
    <ResourceEdit
      {...props}
      initialValues={entity => {
        return {
          date: entity.date,
          field: entity.field,
          comment: entity.comment,
          points:
            entity.points?.map(point => {
              return {
                analyses: point.analyses.map(analys => {
                  const { type } = analys.analysisIndicator;

                  const value = getAnalysValueByType(type, analys.value);

                  return {
                    id: analys.analysisIndicator.id,
                    value,
                    name: analys.analysisIndicator.name,
                    type: analys.analysisIndicator.type,
                    enumValues: analys.analysisIndicator.enumValues,
                  };
                }),
                comment: point.comment,
                photos: point.photos.map(photo => ({
                  uri: photo.photo,
                  loaded: true,
                  point: photo.point,
                  key: photo.photo,
                })),
              };
            }) ?? [],
        };
      }}
      submitting={imagesLoading.loading || props.submitting}
      labels={{
        ...props.labels,
        submitting: imagesLoading.loading
          ? `Завантажено зображень: ${imagesLoading.loaded}/${imagesLoading.total}`
          : props.labels.submitting,
      }}
      beforeSubmit={onSubmitHandler}
    >
      <ScrollView>
        <ScoutingReportsCommon />
        <ScoutingReportsCreatePoints />
      </ScrollView>
    </ResourceEdit>
  );
};
