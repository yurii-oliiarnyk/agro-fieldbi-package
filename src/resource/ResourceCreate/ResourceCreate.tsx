import React, { useEffect, ReactNode } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
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
  beforeSubmit: (values: any) => Promise<any>;
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
  } = props;

  useEffect(() => {
    return function cleanup() {
      clearErrors();
    };
  }, []);

  const onSuccess = () => {
    console.log('go to list page');
  };

  const submitHandler = values => {
    beforeSubmit(values).then(values => {
      return submit({ data: values, onSuccess });
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {({ submitForm }) => {
        if (submitting) {
          return <Loader tip={labels.submitting} />;
        }

        return (
          <>
            <View style={{ flex: 1, padding: 16 }}>
              <ErrorProvider errors={errors}>
                <ErrorFormMessage />
                {children}
              </ErrorProvider>
            </View>
            <View style={{ marginTop: 'auto' }}>
              <ResourceCreateControls
                onCancel={() => console.log('cancel')}
                onSubmit={() => submitForm()}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};