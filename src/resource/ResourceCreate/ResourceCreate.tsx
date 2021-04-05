import React, { useEffect, ReactNode } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikProps } from 'formik';
import { Loader } from '../../UI/Loader';
import { ResourceCreateControls } from './ResourceCreateControls';
import { ErrorFormMessage, ErrorProvider } from '../../UI/error';

type ResourcesCreateProps = {
  submit: (values: any) => void;
  submitting: boolean;
  clearErrors: () => void;
  errors: any;
  initialValues: any;
  children: ReactNode;
  labels: {
    submitting: string;
  };
  name: string;
  beforeSubmit: (values: any) => Promise<any>;
  formikProps?: FormikProps<any>;
};

export const ResourceCreate: React.FC<ResourcesCreateProps> = props => {
  const {
    children,
    submit,
    submitting,
    clearErrors,
    errors,
    initialValues,
    beforeSubmit,
    labels,
    name,
    formikProps = {},
  } = props;

  useEffect(() => {
    return function cleanup() {
      clearErrors();
    };
  }, []);

  const { navigate } = useNavigation();

  const onSuccess = () => {
    navigate(`${name}-list`);
  };

  const submitHandler = values => {
    beforeSubmit(values).then(values => {
      return submit({ data: values, onSuccess });
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler} {...formikProps}>
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
              <ResourceCreateControls
                onCancel={() => navigate(`${name}-list`)}
                onSubmit={() => submitForm()}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};
