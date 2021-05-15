import React from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ResourceCreate } from 'agro-package';
import { emptyEntity } from './utils';
import { ScoutingReportsCreatePoints } from './ScoutingReportsCreatePoints';
import { ScoutingReportsCommon } from './ScoutingReportsCommon';
import { useLoadImages } from '../useLoadImages';

const getAnalysValueByType = (type: number, value: any) => {
  switch (type) {
    case 3: {
      return Boolean(value);
    }
    default:
      return value + '';
  }
};

export const ScoutingReportsCreate = props => {
  const { clearErrors, submit, submitting, errors, labels, name } = props;

  const { params } = useRoute();
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
    <ResourceCreate
      clearErrors={clearErrors}
      errors={errors}
      labels={{
        ...labels,
        submitting: imagesLoading.loading
          ? `Завантажено зображень: ${imagesLoading.loaded}/${imagesLoading.total}`
          : labels.submitting,
      }}
      submit={submit}
      submitting={submitting || imagesLoading.loading}
      initialValues={{
        ...emptyEntity,
        field: {
          id: params?.id,
          name: params?.name,
        },
      }}
      name={name}
      beforeSubmit={onSubmitHandler}
    >
      <ScrollView>
        <ScoutingReportsCommon />
        <ScoutingReportsCreatePoints />
      </ScrollView>
    </ResourceCreate>
  );
};
