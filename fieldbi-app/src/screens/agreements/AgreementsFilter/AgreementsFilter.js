import React from 'react';
import i18n from 'i18n-js';
import ResourcesListFilter from '../../../components/resource/ResourcesList/ResourcesListFilter';
import FormItem from '../../../components/UI/FormItem';
import FormikAjaxSelect from '../../../components/formik/FormikAjaxSelect';
import FilterRangeInput from '../../../components/common/FilterRangeInput';
import DateRangeInput from '../../../components/common/DateRangeInput';
import { AgreementTypeSelect, AgreementSubtypeSelect } from './inputs';

const AgreementsFilter = () => {
  return (
    <ResourcesListFilter name="agreements">
      <FormItem label={i18n.t('agreement.state')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/select-options/contract-state"
          name="state"
          placeholder={i18n.t('agreement.chooseState')}
        />
      </FormItem>

      <AgreementSubtypeSelect />

      <AgreementTypeSelect />

      <DateRangeInput name="dateOfCreation" label={i18n.t('agreement.dateOfDocument')} />

      <DateRangeInput name="validFromDate" label={i18n.t('agreement.validFrom')} />

      <DateRangeInput name="validByDate" label={i18n.t('agreement.validUntil')} />

      <DateRangeInput name="dateOfRegistration" label={i18n.t('agreement.registrationDate')} />

      <FilterRangeInput name="share" label={i18n.t('agreement.share')} />

      <FilterRangeInput name="ngoCurrent" label={i18n.t('land.ngoCurrent')} />

      <FilterRangeInput name="rentPercentage" label={i18n.t('agreement.rentPercentage')} />

      <FilterRangeInput name="rentAmount" label={i18n.t('agreement.rentAmount')} />
    </ResourcesListFilter>
  );
};

export default AgreementsFilter;
