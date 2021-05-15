import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableFeedback } from 'agro-package';
import { ScoutingReportsAnalysisFieldMemo } from './ScoutingReportsAnalysisField';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    minHeight: 46,
  },
  text: {
    width: '30%',
  },
  field: {
    flex: 1,
  },
  icon: {
    marginLeft: 12,
  },
});

export const ScoutingReportsAnalysis = props => {
  const { index } = props;

  const {
    values: { points },
    setFieldValue,
  } = useFormikContext();

  const analyses = useMemo(() => {
    return points[index].analyses;
  }, [index, points]);

  const analysesName = `points[${index}].analyses`;

  const deleteIndicator = index => {
    const updatedIndicators = analyses.filter((_, analysIndex) => index !== analysIndex);
    setFieldValue(analysesName, updatedIndicators);
  };

  if (analyses.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      {analyses.map((analys: any, analysIndex: number) => {
        const fieldName = `${analysesName}[${analysIndex}].value`;

        return (
          <View key={analys.id} style={styles.item}>
            <Text style={styles.text}>{`${analys.name}:`}</Text>
            <View style={styles.field}>
              <ScoutingReportsAnalysisFieldMemo field={analys} fieldName={fieldName} />
            </View>
            <TouchableFeedback style={styles.icon} onPress={() => deleteIndicator(analysIndex)}>
              <Icon name="delete" color="#F64A4A" size={16} />
            </TouchableFeedback>
          </View>
        );
      })}
    </View>
  );
};
