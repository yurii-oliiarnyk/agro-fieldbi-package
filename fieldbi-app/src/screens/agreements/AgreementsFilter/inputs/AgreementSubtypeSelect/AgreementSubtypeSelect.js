import React from 'react';
import i18n from 'i18n-js';
import { useFormikContext } from 'formik';
import FormikRadioButtonGroup from '../../../../../components/formik/FormikRadioButtonGroup';
import FormItem from '../../../../../components/UI/FormItem';

const AgreementSubtypeSelect = () => {
  const { setFieldValue } = useFormikContext();

  const onValueChange = () => {
    setFieldValue('type', undefined);
  };

  return (
    <FormItem label={i18n.t('agreement.subtype')}>
      <FormikRadioButtonGroup
        name="subtype"
        onValueChange={onValueChange}
        values={[
          {
            key: 'undefined',
            label: i18n.t('generals.all'),
            value: undefined
          },
          {
            key: 1,
            label: i18n.t('land.landGetting'),
            value: 1
          },
          {
            key: 2,
            label: i18n.t('land.landTransfer'),
            value: 2
          }
        ]}
      />
    </FormItem>
  );
};

export default AgreementSubtypeSelect;
