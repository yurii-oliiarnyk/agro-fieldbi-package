import React from 'react';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useSafeArea } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import AppButton from '../../../components/UI/AppButton';
import SubdivisionCheckboxField from '../../../components/common/SubdivisionCheckboxField';

const AnalyticsSubdivisions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const nextScreen = route.params.screen;

  const insets = useSafeArea();

  const fieldName = 'selectedSubdivisions';
  const isObjectEmpty = object => !object[fieldName] || object[fieldName].length === 0;

  const onPressHandler = values => {
    navigation.navigate({
      name: nextScreen,
      params: {
        selectedSubdivisions: values[fieldName]
      }
    });
  };

  return (
    <Formik initialValues={{}} onSubmit={onPressHandler}>
      {({ handleSubmit, values }) => {
        return (
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <SubdivisionCheckboxField fieldName={fieldName} enableStaticSubdivision />
            </ScrollView>
            <View
              style={{
                padding: 16,
                backgroundColor: '#fff',
                paddingBottom: insets.bottom > 16 ? insets.bottom : 16
              }}
            >
              <AppButton disabled={isObjectEmpty(values)} onPress={handleSubmit}>
                {i18n.t('analytics.action')}
              </AppButton>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default AnalyticsSubdivisions;
