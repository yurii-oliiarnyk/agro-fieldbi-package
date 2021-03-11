import React from 'react';
import i18n from 'i18n-js';

import { FilterRadioSelect } from '../filters/FilterRadioSelect';
import { FilterRangeInput } from '../filters/FilterRangeInput';
import ResourceLocationFields from '../filters/ResourceLocationFields';
import { SubdivisionListSelect } from '../filters/SubdivisionListSelect';

export const FieldFilter = () => {
  return (
    <>
      <SubdivisionListSelect />

      <FilterRangeInput label={i18n.t('field.tillableArea')} name="tillableArea" />

      <ResourceLocationFields locations={['region', 'district']} />

      <FilterRadioSelect name="withoutPolygon" label={i18n.t('field.withoutPolygon')} />

      <FilterRadioSelect name="withoutPaint" label={i18n.t('field.withoutPaint')} />
    </>
  );
};
