import React, { useState } from 'react';
import { axios } from 'agro-package';
import { ScoutingReportsSelect } from './ScoutingReportsSelect';

export const ScoutingReportsAnalysisIndicatorsSelect = props => {
  const { selectedAnalysisIndicators, disabled } = props;

  const [loading, setLoading] = useState(false);

  const onSaveHandler = (selectedItems: number[]) => {
    setLoading(true);

    Promise.all(
      selectedItems.map(select => {
        return axios.get(`/api/v1/agro/dictionary/analysis-indicators/${select}`);
      })
    )
      .then(allResponses => allResponses.map(response => response.data.data))
      .then(analysisIndicators => {
        selectedAnalysisIndicators(analysisIndicators);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScoutingReportsSelect
      name="Додати показник"
      apiUrl="/api/v1/agro/select-options/analysis-indicator"
      onSave={onSaveHandler}
      loading={loading}
      disabledItems={disabled}
    />
  );
};
