import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/native';
import AnalyticsTable from '../AnalyticsTable';
import axios from '../../../../axios/axios';
import AppLoader from '../../../../components/AppLoader';
import { transformToList } from '../../utils';
import { transformStaticSubdivision } from '../../../../helpers/subdivisions';
import AppWarning from '../../../../components/AppWarning';

const AnalyticPage = props => {
  const { rows, apiURL, transformEntities } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [analytics, setAnalytics] = useState([]);

  const route = useRoute();
  const { selectedSubdivisions } = route.params || {};
  const filteredAnalytics = analytics.filter(analytic =>
    selectedSubdivisions.includes(analytic.id)
  );

  useEffect(() => {
    setLoading(true);

    axios
      .get(apiURL)
      .then(responce => {
        const analytics = responce.data.data;
        const analyticsList = transformStaticSubdivision(transformToList(analytics));

        setAnalytics(analyticsList);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);

        showMessage({
          description: i18n.t('analytics.error'),
          message: i18n.t('errors.error'),
          type: 'danger'
        });
      });
  }, []);

  if (error) {
    return <AppWarning title={i18n.t('analytics.error')} />;
  }

  if (loading) {
    return <AppLoader />;
  }

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <AnalyticsTable
        rows={typeof rows === 'function' ? rows(filteredAnalytics) : rows}
        dataSource={transformEntities(filteredAnalytics)}
      />
    </View>
  );
};

AnalyticPage.propTypes = {
  rows: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
  apiURL: PropTypes.string.isRequired,
  transformEntities: PropTypes.func
};

AnalyticPage.defaultProps = {
  transformEntities: entities => entities
};

export default AnalyticPage;
