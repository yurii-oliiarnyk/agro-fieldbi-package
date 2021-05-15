import React, { useState } from 'react';
import { axios } from 'agro-package';
import { ScoutingReportsSelect } from './ScoutingReportsSelect';

export const ScoutingReportsScoutingTypeSelect = props => {
  const { selectedAnalysisIndicators } = props;

  const [loading, setLoading] = useState(false);

  const onSaveHandler = (selectedItems: number[]) => {
    setLoading(true);

    Promise.all(
      selectedItems.map(select => {
        return axios.get(`/api/v1/agro/scouting-types/${select}`);
      })
    )
      .then(allResponses => allResponses.flatMap(response => response.data.data.analysisIndicators))
      .then(analysisIndicators => {
        selectedAnalysisIndicators(analysisIndicators);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ScoutingReportsSelect
      name="Додати вид скаутингу"
      apiUrl="/api/v1/agro/select-options/scouting-types"
      onSave={onSaveHandler}
      loading={loading}
    />
  );
};
