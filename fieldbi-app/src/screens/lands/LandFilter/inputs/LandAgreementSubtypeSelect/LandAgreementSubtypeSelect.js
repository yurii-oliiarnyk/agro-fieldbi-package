import React from 'react';
import i18n from 'i18n-js';
import { useFormikContext } from 'formik';
import FormikRadioButtonGroup from '../../../../../components/formik/FormikRadioButtonGroup';
import FormItem from '../../../../../components/UI/FormItem';

const LandAgreementSubtypeSelect = () => {
  const { setFieldValue } = useFormikContext();

  const onValueChange = () => {
    setFieldValue('landAgreementsTypes', undefined);
  };

  return (
    <FormItem label={i18n.t('agreement.subtype')}>
      <FormikRadioButtonGroup
        name="landAgreementsSubType"
        onValueChange={onValueChange}
        values={[
          {
            key: 'undefined',
            value: undefined,
            label: i18n.t('generals.all')
          },
          {
            label: i18n.t('land.landGetting'),
            key: '1',
            value: 1
          },
          {
            label: i18n.t('land.landTransfer'),
            key: '2',
            value: 2
          }
        ]}
      />
    </FormItem>
  );
};

export default LandAgreementSubtypeSelect;
