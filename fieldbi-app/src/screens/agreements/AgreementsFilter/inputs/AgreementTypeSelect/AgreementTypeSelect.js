import React from 'react';
import i18n from 'i18n-js';
import { useFormikContext } from 'formik';
import FormikSelect from '../../../../../components/formik/FormikSelect';
import FormItem from '../../../../../components/UI/FormItem';

const AgreementTypeSelect = () => {
  const {
    values: { subtype }
  } = useFormikContext();

  let options = [];

  if (subtype === 1) {
    options = [
      {
        name: i18n.t('agreement.rentAgreement'),
        id: 1
      },
      {
        name: i18n.t('agreement.sublease'),
        id: 2
      },
      {
        name: i18n.t('agreement.exchangeAgreement'),
        id: 3
      },
      {
        name: i18n.t('agreement.emphyteusisAgreement'),
        id: 5
      }
    ];
  }

  if (subtype === 2) {
    options = [
      {
        name: i18n.t('agreement.sublease'),
        id: 2
      },
      {
        name: i18n.t('agreement.exchangeAgreement'),
        id: 3
      }
    ];
  }

  return (
    <FormItem label={i18n.t('agreement.contractType')}>
      <FormikSelect
        name="type"
        disabled={!subtype}
        options={options}
        placeholder={i18n.t('agreement.chooseAgreementType')}
        emptyLabel={i18n.t('agreement.chooseAgreementSubtype')}
      />
    </FormItem>
  );
};

export default AgreementTypeSelect;
