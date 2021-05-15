import React from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { ScoutingReportsTabs } from '../ScoutingReportsTabs';
import { ScoutingReportsCreateTab } from './ScoutingReportsCreateTab';
import { emptyPoint } from './utils';

export const ScoutingReportsCreatePoints: React.FC = () => {
  const {
    values: { points },
  } = useFormikContext();

  return (
    <FieldArray
      name="points"
      render={arrayHelpers => (
        <ScoutingReportsTabs
          render={index => <ScoutingReportsCreateTab index={index} />}
          addNewTab={() => arrayHelpers.push(emptyPoint)}
          removeTab={index => arrayHelpers.remove(index)}
          tabs={points}
        />
      )}
    />
  );
};
