import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import i18n from 'i18n-js';
import { useFormikContext } from 'formik';
import axios from '../../../axios/axios';
import SubdivisionCheckboxFieldList from './SubdivisionCheckboxFieldList';
import AppLoader from '../../AppLoader';
import AppWarning from '../../AppWarning';
import { addStaticSubdivisions, onItemPressHandler } from './utils';

const SubdivisionCheckboxField = props => {
  const { fieldName, enableStaticSubdivision, groupedChild } = props;

  const [loading, setLoading] = useState(true);
  const [subdivisions, setSubdivisions] = useState([]);
  const [error, setError] = useState(false);

  const formik = useFormikContext();
  const { values, setFieldValue } = formik;
  const selectedSubdivisions = values[fieldName] || [];

  const loadSubdivisions = () => {
    setError(false);
    setLoading(true);

    axios
      .get('/api/v1/dictionary/subdivisions/restricted-tree')
      .then(responce => {
        let subdivisions = responce.data.data;

        if (enableStaticSubdivision) {
          subdivisions = addStaticSubdivisions(subdivisions);
        }

        setSubdivisions(subdivisions);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSubdivisions();
  }, []);

  const updateFieldValue = value => {
    setFieldValue(fieldName, value);
  };

  const onItemPress = id => {
    const options = {
      groupMode: groupedChild,
      selectedSubdivisions,
      subdivisions,
      updateFieldValue
    };

    onItemPressHandler(id, options);
  };

  if (error) {
    return <AppWarning title={i18n.t('analytics.subdivisionError')} />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <AppLoader />
      </View>
    );
  }

  return (
    <SubdivisionCheckboxFieldList
      subdivisions={subdivisions}
      onItemPress={onItemPress}
      isSelected={id => selectedSubdivisions.includes(id)}
    />
  );
};

SubdivisionCheckboxField.defaultProps = {
  enableStaticSubdivision: false,
  groupedChild: false
};

SubdivisionCheckboxField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  enableStaticSubdivision: PropTypes.bool,
  groupedChild: PropTypes.bool
};

export default SubdivisionCheckboxField;
