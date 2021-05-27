import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import i18n from 'i18n-js';
import AnalyticsListItem from './AnalyticsListItem';
import screens from '../../../navigation/screens';

const AnalyticsList = () => {
  const analyticList = [
    {
      name: i18n.t('analytics.generals.name'),
      screen: screens.AnalyticsGeneral,
      key: 'general'
    },
    {
      name: i18n.t('analytics.landPurpose.name'),
      screen: screens.AnalyticsPurpose,
      key: 'land-purpose'
    },
    {
      name: i18n.t('analytics.landType.name'),
      screen: screens.AnalyticsLandType,
      key: 'land-type'
    },
    {
      name: i18n.t('analytics.agreementYear.name'),
      screen: screens.AnalyticsAgreementYear,
      key: 'agreement-year'
    },
    {
      name: i18n.t('analytics.agreementState.name'),
      screen: screens.AnalyticsAgreementState,
      key: 'agreement-state'
    },
    {
      name: i18n.t('analytics.agronomistConclusion.name'),
      screen: screens.AnalyticsAgronomistConclusion,
      key: 'agronomist-conclusion'
    },
    {
      name: i18n.t('analytics.soilType.name'),
      screen: screens.AnalyticsSoilType,
      key: 'soil-type'
    },
    {
      name: i18n.t('analytics.documentLocation.name'),
      screen: screens.AnalyticsDocumentLocation,
      key: 'document-location'
    }
  ];

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#fff' }}>
      <View style={styles.row}>
        {analyticList.map(analytic => (
          <View key={analytic.key} style={styles.col}>
            <AnalyticsListItem name={analytic.name} screen={analytic.screen} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4
  },
  col: {
    padding: 4,
    width: '50%',
    flexDirection: 'row'
  }
});

export default AnalyticsList;
