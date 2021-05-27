import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from '../../../axios/axios';
import useMountedState from '../../../hooks/useMountedState';
import AppLoader from '../../../components/AppLoader';
import MonitoringCenterFilterList from './MonitoringCenterFilterList';
import screens from '../../../navigation/screens';
import FilterScreen from '../../../components/common/FilterScreen';

const MonitoringCenterFilterScreen = () => {
  const isMounted = useMountedState();
  const [loading, setLoading] = useState(false);
  const [entities, setEntities] = useState([]);
  const { navigate } = useNavigation();

  const route = useRoute();
  const { contractState } = route.params || {};

  const withoutContractState = {
    id: '0',
    name: 'Без договору',
    backgroundColor: 'rgb(202,76,26)'
  };

  useEffect(() => {
    const apiUrl = '/api/v1/select-options/contract-state';
    setLoading(true);

    axios
      .get(apiUrl, {
        params: {
          limit: 0
        }
      })
      .then(responce => responce.data.pagination.count)
      .then(totalCount =>
        axios.get(apiUrl, {
          params: {
            limit: totalCount
          }
        })
      )
      .then(responce => {
        if (isMounted()) {
          setEntities(
            [withoutContractState].concat(responce.data.data.filter(item => item.backgroundColor))
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onCancelHandler = () => {
    navigate({
      name: screens.MonitoringCenter,
      params: {
        contractState: null
      }
    });
  };

  const onSubmitHandler = values => {
    navigate({
      name: screens.MonitoringCenter,
      params: {
        contractState: entities.find(entity => entity.id === values.contractState)
      }
    });
  };

  if (loading) {
    return <AppLoader />;
  }

  return (
    <Formik
      initialValues={{
        contractState: contractState ? contractState.id : null
      }}
      onSubmit={onSubmitHandler}
    >
      {({ values }) => {
        const isFilteredValues = !!values.contractState;

        return (
          <FilterScreen
            wrapperPadding={0}
            onCancelHandler={onCancelHandler}
            isFilteredValues={isFilteredValues}
          >
            <MonitoringCenterFilterList dataSource={entities} />
          </FilterScreen>
        );
      }}
    </Formik>
  );
};

export default MonitoringCenterFilterScreen;
