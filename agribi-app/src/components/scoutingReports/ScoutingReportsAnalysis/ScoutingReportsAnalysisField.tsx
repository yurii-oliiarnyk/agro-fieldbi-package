import React, { memo } from 'react';
import { FormikTextInput, FormikSwitch, FormikSelect } from 'agro-package';

const FIELD_TYPES = {
  NUMBER: 1,
  TEXT: 2,
  BOOLEAN: 3,
  SELECT: 4,
};

type ScoutingReportsAnalysisFieldProps = {
  field: {
    type: 1 | 2 | 3 | 4;
    enumValues: string[];
  };
  fieldName: string;
};

const ScoutingReportsAnalysisField: React.FC<ScoutingReportsAnalysisFieldProps> = props => {
  const { field, fieldName } = props;

  const { type } = field;

  if (type === FIELD_TYPES.TEXT) {
    return <FormikTextInput name={fieldName} placeholder="Вкажіть значення" />;
  }

  if (type === FIELD_TYPES.NUMBER) {
    return (
      <FormikTextInput name={fieldName} placeholder="Вкажіть значення" keyboardType="decimal-pad" />
    );
  }

  if (type === FIELD_TYPES.BOOLEAN) {
    return <FormikSwitch name={fieldName} />;
  }

  if (type === FIELD_TYPES.SELECT) {
    return (
      <FormikSelect
        name={fieldName}
        options={
          Array.isArray(field.enumValues)
            ? field.enumValues.map(value => ({
                id: value,
                name: value,
              }))
            : []
        }
        onValueChange={() => null}
        placeholder="Оберіть значення"
      />
    );
  }

  return null;
};

export const ScoutingReportsAnalysisFieldMemo = memo(
  ScoutingReportsAnalysisField,
  (prevProps, nextProps) => {
    return prevProps.fieldName === nextProps.fieldName;
  }
);
