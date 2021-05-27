import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import FilterScreenControls from './FilterScreenControls';

const FilterScreen = props => {
  const { children, onCancelHandler, isFilteredValues, wrapperPadding } = props;

  const { setValues, handleSubmit } = useFormikContext();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ padding: wrapperPadding }}>
        {children}
      </ScrollView>
      <FilterScreenControls
        isFilteredValues={isFilteredValues}
        onSubmit={handleSubmit}
        onClear={() => setValues({})}
        onCancel={onCancelHandler}
      />
    </View>
  );
};

FilterScreen.defaultProps = {
  wrapperPadding: 16
};

FilterScreen.propTypes = {
  children: PropTypes.node.isRequired,
  onCancelHandler: PropTypes.func.isRequired,
  isFilteredValues: PropTypes.bool.isRequired,
  wrapperPadding: PropTypes.number
};

export default FilterScreen;
