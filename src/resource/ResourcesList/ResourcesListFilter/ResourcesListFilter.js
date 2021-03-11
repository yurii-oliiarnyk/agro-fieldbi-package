import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'deep-equal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { removeEmptyFilterValues } from './utils';
import { filterResource } from '../../../store';
import { FilterScreen } from '../../../components/FilterScreen/FilterScreen';

const ResourcesListFilter = props => {
  const { parseFilterFields, transformFilterFields, filterResource, filterBy, children } = props;
  const navigation = useNavigation();

  const initialValues = useMemo(() => {
    const values = {};

    const filterByObj = JSON.parse(filterBy);

    Object.entries(parseFilterFields(filterByObj)).forEach(([key, value]) => {
      if (typeof value === 'object') {
        values[key] = {
          from: value ? value.from : '',
          to: value ? value.to : '',
        };
      } else {
        values[key] = value;
      }
    });

    return values;
  }, [filterBy]);

  const filterResourceHandler = currentValues => {
    console.log(initialValues, currentValues, isEqual(initialValues, currentValues));

    if (!isEqual(initialValues, currentValues)) {
      const transformedValues = removeEmptyFilterValues(currentValues);
      const stringifyValues = JSON.stringify(transformedValues);

      filterResource(stringifyValues);
    }

    navigation.goBack();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        filterResourceHandler(transformFilterFields(values));
      }}
    >
      {({ values }) => {
        return (
          <FilterScreen
            isFilteredValues={!isEqual(removeEmptyFilterValues(values), {})}
            onCancelHandler={() => {
              filterResourceHandler({});
            }}
          >
            {children}
          </FilterScreen>
        );
      }}
    </Formik>
  );
};

ResourcesListFilter.defaultProps = {
  transformFilterFields: values => values,
  parseFilterFields: values => values,
};

ResourcesListFilter.propTypes = {
  filterResource: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  transformFilterFields: PropTypes.func,
  parseFilterFields: PropTypes.func,
};

export default connect(
  (state, { name }) => {
    return {
      filterBy: state[name].filterBy,
    };
  },
  (dispatch, { name }) => {
    const boundActions = bindActionCreators(
      {
        filterResource: filterResource(name),
      },
      dispatch
    );

    return { ...boundActions };
  }
)(ResourcesListFilter);
