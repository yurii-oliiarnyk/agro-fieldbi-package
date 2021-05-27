import React from 'react';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import SubdivisionCheckboxField from '../../../components/common/SubdivisionCheckboxField';
import screens from '../../../navigation/screens';
import FilterScreen from '../../../components/common/FilterScreen';

const TaskboardFilter = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { subdivisions } = route.params || {};

  const fieldName = 'subdivisions';
  const isObjectEmpty = object => !object[fieldName] || object[fieldName].length === 0;

  const onSubmitHandler = values => {
    navigation.navigate({
      name: screens.Taskboard,
      params: {
        subdivisions: values[fieldName]
      }
    });
  };

  const onCancelHandler = () => {
    navigation.navigate({
      name: screens.Taskboard,
      params: {
        subdivisions: null
      }
    });
  };

  return (
    <Formik initialValues={{ subdivisions }} onSubmit={onSubmitHandler}>
      {({ values }) => {
        return (
          <FilterScreen
            wrapperPadding={0}
            isFilteredValues={!isObjectEmpty(values)}
            onCancelHandler={onCancelHandler}
          >
            <SubdivisionCheckboxField fieldName={fieldName} groupedChild />
          </FilterScreen>
        );
      }}
    </Formik>
  );
};

export default TaskboardFilter;
