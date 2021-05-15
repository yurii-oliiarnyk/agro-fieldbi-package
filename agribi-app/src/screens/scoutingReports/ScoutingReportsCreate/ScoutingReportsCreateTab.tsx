import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useFormikContext } from 'formik';
import { FormikFormItem, FormikTextInput } from 'agro-package';
import { ImagePicker } from '../../../UI/ImagePicker/ImagePicker';
import { ScoutingReportsScoutingTypeSelect } from '../../../components/scoutingReports/ScoutingReportsScoutingTypeSelect';
import { ScoutingReportsAnalysisIndicatorsSelect } from '../../../components/scoutingReports/ScoutingReportsAnalysisIndicatorsSelect';
import { ScoutingReportsAnalysis } from '../../../components/scoutingReports/ScoutingReportsAnalysis';

type ScoutingReportsCreateTabProps = {
  index: number;
};

export const ScoutingReportsCreateTab: React.FC<ScoutingReportsCreateTabProps> = props => {
  const { index } = props;

  const { values, setFieldValue } = useFormikContext();

  const { photos, analyses } = useMemo(() => {
    const point = values.points[index];

    return point;
  }, [index, values]);

  const addImage = image => {
    const updatedPhotos = [...photos, image];

    setFieldValue(`points[${index}].photos`, updatedPhotos);
  };

  const removeImage = image => {
    const filteredPhotos = photos.filter(prevImage => prevImage.key !== image.key);
    setFieldValue(`points[${index}].photos`, filteredPhotos);
  };

  const saveIndicators = newAnalyses => {
    setFieldValue(
      `points[${index}].analyses`,
      newAnalyses.reduce((acc, item) => {
        if (acc.find(accItem => accItem.id === item.id)) {
          return acc;
        }

        return [...acc, item];
      }, analyses)
    );
  };

  return (
    <View style={{ paddingVertical: 12 }}>
      <FormikFormItem name={`points[${index}].photos`}>
        <ImagePicker
          name={`points[${index}].photos`}
          addImage={addImage}
          images={photos}
          removeImage={removeImage}
        />
      </FormikFormItem>
      <FormikFormItem name={`points[${index}].comment`} label="Коментар">
        <FormikTextInput name={`points[${index}].comment`} multiline maxLength={1000} />
      </FormikFormItem>
      <FormikFormItem name={`points[${index}].analyses`}>
        <View>
          <ScoutingReportsAnalysis index={index} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <ScoutingReportsScoutingTypeSelect selectedAnalysisIndicators={saveIndicators} />
            <ScoutingReportsAnalysisIndicatorsSelect
              selectedAnalysisIndicators={saveIndicators}
              disabled={analyses.map(analys => analys.id)}
            />
          </View>
        </View>
      </FormikFormItem>
    </View>
  );
};
