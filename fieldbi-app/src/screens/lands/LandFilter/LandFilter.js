import React from 'react';
import i18n from 'i18n-js';
import ResourcesListFilter from '../../../components/resource/ResourcesList/ResourcesListFilter';
import FilterRangeInput from '../../../components/common/FilterRangeInput';
import ResourceLocationFields from '../../../components/common/ResourceLocationFields';
import SubdivisionListSelect from '../../../components/common/SubdivisionListSelect';
import FilterRadioSelect from '../../../components/common/FilterRadioSelect';
import FormikAppSwitch from '../../../components/formik/FormikAppSwitch';
import FormikAjaxSelect from '../../../components/formik/FormikAjaxSelect';
import FormItem from '../../../components/UI/FormItem';
import { LandAgreementTypesSelect, LandAgreementSubtypeSelect } from './inputs';

const LandFilter = () => {
  return (
    <ResourcesListFilter
      name="lands"
      transformFilterFields={values => {
        const { landAgreementsTypes } = values;
        const newValues = { ...values };

        if (landAgreementsTypes) {
          newValues.landAgreementsTypes = [landAgreementsTypes];
        }

        return newValues;
      }}
      parseFilterFields={values => {
        const { landAgreementsTypes } = values;

        return {
          ...values,
          landAgreementsTypes: Array.isArray(landAgreementsTypes)
            ? landAgreementsTypes[0]
            : undefined
        };
      }}
    >
      <SubdivisionListSelect withNullSubdivion />

      <FormItem label={i18n.t('land.withoutCadastralNumber')} type="vertical">
        <FormikAppSwitch name="isCadastralNumberNotExists" />
      </FormItem>

      <FilterRangeInput name="cadastralArea" label={i18n.t('land.cadastralArea')} />

      <FilterRangeInput name="contourArea" label={i18n.t('land.contourArea')} />

      {/* TODO: add field select */}

      <FilterRadioSelect name="outside" label={i18n.t('land.fieldOutside')} />

      <FilterRadioSelect name="withoutPolygon" label={i18n.t('land.withoutPolygon')} />

      <FilterRadioSelect name="withoutAgreements" label={i18n.t('land.withoutAgreements')} />

      <FormItem label={i18n.t('soilType.singleName')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/select-options/soil-type"
          name="soilType"
          placeholder={i18n.t('soilType.choose')}
        />
      </FormItem>

      <FilterRadioSelect name="isInDemand" label={i18n.t('land.isInDemand')} />

      <FilterRangeInput name="ngo1995" label={i18n.t('land.ngo1995')} />

      <FilterRangeInput name="ngoCurrent" label={i18n.t('land.ngoCurrent')} />

      <FormItem label={i18n.t('landType.singleName')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/select-options/land-type"
          name="landType"
          placeholder={i18n.t('landType.choose')}
        />
      </FormItem>

      <FormItem label={i18n.t('landPurpose.singleName')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/select-options/land-purpose"
          name="landPurpose"
          placeholder={i18n.t('landPurpose.choose')}
        />
      </FormItem>

      <ResourceLocationFields />

      <FilterRadioSelect name="intersectionArea" label={i18n.t('land.intersectionArea')} />

      <LandAgreementSubtypeSelect />

      <LandAgreementTypesSelect />
    </ResourcesListFilter>
  );
};

export default LandFilter;
