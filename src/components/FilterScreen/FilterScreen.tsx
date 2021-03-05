import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import { FilterScreenControls } from './FilterScreenControls';

type FilterScreenTypes = {
  children: ReactNode;
  onCancelHandler: () => void;
  isFilteredValues: boolean;
  wrapperPadding: number;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
  },
});

export const FilterScreen: React.FC<FilterScreenTypes> = props => {
  const { children, onCancelHandler, isFilteredValues, wrapperPadding = 16 } = props;

  const { setValues, handleSubmit } = useFormikContext();

  return (
    <View style={styles.view}>
      <ScrollView contentContainerStyle={styles.container} style={{ padding: wrapperPadding }}>
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
