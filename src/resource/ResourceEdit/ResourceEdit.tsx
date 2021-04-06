import React, { ReactNode, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import { Loader } from '../../UI/Loader';
import { useNavigation } from '@react-navigation/native';
import { ErrorFormMessage, ErrorProvider } from '../../UI/error';
import { ResourceEditControls } from './ResourceEditControls';

type ResourceEditProps = {
  submit: (values: any) => void;
  children: ReactNode;
  labels: {
    submitting: string;
    success: string;
  };
  submitting?: boolean;
  name: string;
  initialValues: (entity: any) => any;
  beforeSubmit: (values: any) => Promise<any>;
  formikProps?: any;
  clearErrors: () => void;
  id: number;
  entity: any;
  errors: any;
};

export const ResourceEdit: React.FC<ResourceEditProps> = props => {
  const {
    name,
    children,
    submitting,
    labels,
    submit,
    beforeSubmit,
    formikProps = {},
    initialValues,
    id,
    clearErrors,
    errors,
    entity,
  } = props;

  const { navigate } = useNavigation();

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [id]);

  const onSuccess = () => {
    navigate(`${name}-show`);
  };

  const submitHandler = values => {
    beforeSubmit(values).then(values => {
      submit({
        resourceData: values,
        id,
        onSuccess,
        successMessage: labels.success,
      });
    });
  };

  return (
    <Formik initialValues={initialValues(entity)} onSubmit={submitHandler} {...formikProps}>
      {({ submitForm }) => {
        if (submitting) {
          return <Loader tip={labels.submitting} />;
        }

        return (
          <>
            <ErrorProvider errors={errors}>
              <ErrorFormMessage />
              <ScrollView>{children}</ScrollView>
            </ErrorProvider>
            <View style={{ marginTop: 'auto' }}>
              <ResourceEditControls
                onCancel={() => navigate(`${name}-show`)}
                onSubmit={() => submitForm()}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};
