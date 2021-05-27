import React from 'react';
import i18n from 'i18n-js';
import ResourceLocationFields from '../../../components/common/ResourceLocationFields';
import FilterRangeInput from '../../../components/common/FilterRangeInput';
import ResourcesListFilter from '../../../components/resource/ResourcesList/ResourcesListFilter';
import FilterRadioSelect from '../../../components/common/FilterRadioSelect';
import SubdivisionListSelect from '../../../components/common/SubdivisionListSelect';

const FieldFilter = () => {
  return (
    <ResourcesListFilter name="fields">
      <SubdivisionListSelect />

      <FilterRangeInput label={i18n.t('field.tillableArea')} name="tillableArea" />

      <ResourceLocationFields locations={['region', 'district']} />

      <FilterRadioSelect name="withoutPolygon" label={i18n.t('field.withoutPolygon')} />

      <FilterRadioSelect name="withoutPaint" label={i18n.t('field.withoutPaint')} />
    </ResourcesListFilter>
  );
};

export default FieldFilter;
