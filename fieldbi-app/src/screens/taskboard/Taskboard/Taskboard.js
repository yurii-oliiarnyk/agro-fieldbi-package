import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from '../../../axios/axios';
import AppLoader from '../../../components/AppLoader';
import TaskboardFAB from '../TaskboardFAB';
import { getObjectFromArrayOfObject } from '../../../helpers';

import TaskboardLands from './TaskboardLands';
import TaskboardFields from './TaskboardFields';
import TaskboardFinances from './TaskboardFinances';
import TaskboardAgreements from './TaskboardAgreements';
import TaskboardCounterparties from './TaskboardCounterparties';
import TaskboardActivities from './TaskboardActivities';

import { useUser } from '../../../hooks';

const Taskboard = () => {
  const route = useRoute();
  const { subdivisions } = route.params || {};

  const [taskBarInfo, setTaskBarInfo] = useState([]);
  const [screenLoading, setScreenLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [error, setError] = useState(false);

  const { isAdmin } = useUser();

  const loadData = setLoading => {
    setLoading(true);

    const params =
      subdivisions && subdivisions.length > 0 ? { 'filterBy[]': { subdivisions } } : {};

    return axios
      .get('/api/v1/task-board/statistics', {
        params
      })
      .then(responce => {
        const data = getObjectFromArrayOfObject(responce.data.data);

        setTaskBarInfo(data);
      })
      .catch(({ response }) => {
        setError(response.status);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData(setScreenLoading);
  }, [subdivisions]);

  const filter = {};

  if (subdivisions && subdivisions.length > 0) {
    filter.subdivisions = subdivisions;
  }

  const {
    fieldsStatistics,
    landsStatistics,
    agreementsStatistics,
    financesStatistics,
    counterpartyStatistics,
    usersStatistics
  } = taskBarInfo;

  if (screenLoading) {
    return <AppLoader />;
  }

  const refreshControl = (
    <RefreshControl refreshing={refreshLoading} onRefresh={() => loadData(setRefreshLoading)} />
  );

  return (
    <>
      <ScrollView style={{ backgroundColor: '#f5f5f5' }} refreshControl={refreshControl}>
        <View>
          {fieldsStatistics && <TaskboardFields statistics={fieldsStatistics} filter={filter} />}
          {landsStatistics && <TaskboardLands statistics={landsStatistics} filter={filter} />}
          {financesStatistics && <TaskboardFinances statistics={financesStatistics} />}
          {agreementsStatistics && (
            <TaskboardAgreements statistics={agreementsStatistics} filter={filter} />
          )}
          {counterpartyStatistics && (
            <TaskboardCounterparties statistics={counterpartyStatistics} />
          )}
          {isAdmin() && usersStatistics && <TaskboardActivities statistics={usersStatistics} />}
        </View>
      </ScrollView>
      <TaskboardFAB filterParams={{ subdivisions }} />
    </>
  );
};

export default Taskboard;
