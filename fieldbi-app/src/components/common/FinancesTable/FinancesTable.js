import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import i18n from 'i18n-js';
import { View, Text, StyleSheet } from 'react-native';
import AppTouchableFeedback from '../../AppTouchableFeedback';
import AppTable from '../../AppTable';
import Empty from '../../Empty';
import { FILTER_DATE_FORMAT, MONTH_FORMAT } from '../../../config';

const FinancesTable = props => {
  const { dataSource, isError, loading, columns, onChangeHandler } = props;

  const [dates, setDates] = useState([moment(), moment()]);

  const isSamePeriod = (currentDates, comparetedDates) => {
    return (
      currentDates[0].isSame(comparetedDates[0], 'month') &&
      currentDates[1].isSame(comparetedDates[1], 'month')
    );
  };

  useEffect(() => {
    const from = dates[0].startOf('month').format(FILTER_DATE_FORMAT);
    const to = dates[1].endOf('month').format(FILTER_DATE_FORMAT);

    onChangeHandler(from, to);
  }, [dates]);

  const getCurrentPeriod = period => {
    const start = moment().startOf(period);
    const end = moment().endOf(period);

    return [start, end];
  };

  const getPrevPeriod = period => {
    const start = moment()
      .subtract(1, period)
      .startOf(period);
    const end = moment()
      .subtract(1, period)
      .endOf(period);

    return [start, end];
  };

  const controls = [
    {
      id: 'current-month',
      name: i18n.t('finances.currentMonth'),
      period: getCurrentPeriod('month')
    },
    {
      id: 'current-quarter',
      name: i18n.t('finances.currentQuarter'),
      period: getCurrentPeriod('quarter')
    },
    {
      id: 'current-year',
      name: i18n.t('finances.currentYear'),
      period: getCurrentPeriod('year')
    },
    {
      id: 'prev-month',
      name: i18n.t('finances.prevMonth'),
      period: getPrevPeriod('month')
    },
    {
      id: 'prev-quarter',
      name: i18n.t('finances.prevQuarter'),
      period: getPrevPeriod('quarter')
    },
    {
      id: 'prev-year',
      name: i18n.t('finances.prevYear'),
      period: getPrevPeriod('year')
    }
  ];

  return (
    <>
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>
            {i18n.t('finances.period')}
            {` - ${moment(dates[0]).format(MONTH_FORMAT)} - ${moment(dates[1]).format(
              MONTH_FORMAT
            )}`}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {controls.map(({ id, name, period }) => {
            const isActive = isSamePeriod(period, dates);

            return (
              <View style={styles.buttonWrap} key={id}>
                <AppTouchableFeedback
                  style={[styles.button, isActive && styles.buttonActive]}
                  onPress={() => {
                    if (!isActive) {
                      setDates(period);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>{name}</Text>
                </AppTouchableFeedback>
              </View>
            );
          })}
        </View>
      </View>
      <View>
        {isError && <Empty description={i18n.t('ui.dataNotLoaded')} />}
        {!isError && <AppTable columns={columns} dataSource={dataSource} loading={loading} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -4
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCFDFF',
    borderColor: '#E8F0FE',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8
  },
  buttonActive: {
    backgroundColor: '#dbe7ff'
  },
  buttonText: {
    textAlign: 'center'
  },
  buttonWrap: {
    padding: 4,
    width: '33.33%',
    flexDirection: 'row'
  }
});

FinancesTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  isError: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default FinancesTable;
