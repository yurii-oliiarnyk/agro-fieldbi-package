import React, { ReactNode, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Formik } from 'formik';
import { Loader } from '../../UI/Loader';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorFormMessage, ErrorProvider } from '../../UI/error';
import {
  updateResource,
  errorsSelector,
  clearResourceErrors,
  fetchResource,
  resourceSelector,
} from '../../store/resources';
import { ResourceEditControls } from './ResourceEditControls';

type ResourceEditProps = {
  children: () => ReactNode;
  labels: {
    submitting: string;
    success: string;
  };
  name: string;
  initialValues: (entity: any) => any;
  beforeSubmit: (values: any) => Promise<any>;
  formikProps: any;
};

export const ResourceEdit: React.FC<ResourceEditProps> = props => {
  const { name, children, labels, beforeSubmit, formikProps = {}, initialValues } = props;

  const params = useRoute();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { entitieId: id } = params;

  const fetchResourceHandler = fetchResource(name);
  const updateResourceHandler = updateResource(name);
  const clearResourceErrorsHandler = clearResourceErrors(name);
  const entity = useSelector(state => resourceSelector(state[name], id));
  const errors = useSelector(state => errorsSelector(state[name].updateResourceErrors));
  const submitting = useSelector(state => state[name].updateResourceSubmitting);

  useEffect(() => {
    if (!entity) {
      dispatch(fetchResourceHandler(id));
    }
  }, [fetchResourceHandler]);

  useEffect(() => {
    return () => {
      dispatch(clearResourceErrorsHandler());
    };
  }, []);

  const onSuccess = () => {
    navigate(`${name}-show`, params);
  };

  const submitHandler = values => {
    beforeSubmit(values).then(values => {
      return dispatch(
        updateResourceHandler({
          resourceData: values,
          id,
          onSuccess,
          successMessage: labels.success,
        })
      );
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
                onCancel={() => navigate(`${name}-show`, params)}
                onSubmit={() => submitForm()}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};
