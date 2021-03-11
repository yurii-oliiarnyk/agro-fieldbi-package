import React from 'react';
import i18n from 'i18n-js';
import { getListFromTree, addNullSubdivisions } from './utils';
import { FormikAjaxSelect } from '../../../UI/formik/FormikAjaxSelect';
import { FormItem } from '../../../UI/FormItem';

type SubdivisionListSelectTypes = {
  withNullSubdivion?: boolean;
};

export const SubdivisionListSelect: React.FC<SubdivisionListSelectTypes> = props => {
  const { withNullSubdivion } = props;

  return (
    <FormItem label="Підрозділ">
      <FormikAjaxSelect
        apiUrl="/api/v1/dictionary/subdivisions/list"
        placeholder={i18n.t('subdivision.choose')}
        name="subdivision"
        transformedOptionsHandler={options => {
          const subdivisions = withNullSubdivion ? addNullSubdivisions(options) : options;

          return getListFromTree(subdivisions);
        }}
      />
    </FormItem>
  );
};
