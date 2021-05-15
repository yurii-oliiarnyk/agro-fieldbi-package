import React from 'react';
import i18n from 'i18n-js';
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import { ResourceTable, ErrorField, getFormattedTimeDate } from 'agro-package';

const styles = StyleSheet.create({
  table: {
    marginBottom: 16,
  },
});

export const ScoutingReportsCommon: React.FC = () => {
  const formik = useFormikContext();
  const {
    values: { field, date },
  } = formik;

  return (
    <ResourceTable
      data={[
        {
          key: 'field',
          name: 'Поле',
          value: field?.name ?? i18n.t('ui.generals.noDataSymbol'),
          note: <ErrorField name="field" />,
        },
        {
          key: 'date',
          name: 'Дата',
          value: date ? getFormattedTimeDate(date) : i18n.t('ui.generals.no_data_symbols'),
          note: <ErrorField name="date" />,
        },
      ]}
      style={styles.table}
    />
  );
};
