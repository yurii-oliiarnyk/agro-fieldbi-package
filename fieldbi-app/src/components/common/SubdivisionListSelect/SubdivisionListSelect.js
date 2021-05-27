import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import FormikAjaxSelect from '../../formik/FormikAjaxSelect';
import FormItem from '../../UI/FormItem';
import { getListFromTree, addNullSubdivisions } from './utils';

const SubdivisionListSelect = props => {
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

SubdivisionListSelect.propTypes = {
  withNullSubdivion: PropTypes.bool
};

export default SubdivisionListSelect;
