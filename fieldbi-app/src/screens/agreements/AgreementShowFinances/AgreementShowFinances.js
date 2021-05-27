import React, { useState } from 'react';
import moment from 'moment';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';
import OutputNumber from '../../../components/UI/OutputNumber';
import { getFormattedDate, getFormattedYear } from '../../../helpers';
import FinancesTable, { transformBalanceEntity } from '../../../components/common/FinancesTable';
import axios from '../../../axios/axios';

const transformData = entity => {
  const data = transformBalanceEntity(entity);

  if (!data) {
    return [];
  }

  const { openingBalance, balances, charges, payments, closedBalance } = data;

  const rows = [];

  rows.push({
    key: 'openingBalance',
    name: i18n.t('finances.openingBalance'),
    textStyle: {
      fontWeight: 'bold'
    },
    ...openingBalance
  });

  if (moment().unix() < moment(data.dateFrom).unix()) {
    return rows;
  }

  if (balances) {
    rows.push({
      key: 'balances',
      name: i18n.t('finances.balance'),
      ...balances,
      children: balances.children.map(balance => ({
        key: balance.id,
        name: getFormattedDate(balance.date),
        ...balance
      }))
    });
  }

  if (charges) {
    rows.push({
      key: 'charges',
      name: i18n.t('finances.charges'),
      ...charges,
      children: charges.children.map(charge => ({
        key: charge.id,
        name: getFormattedDate(charge.date),
        ...charge
      }))
    });
  }

  if (payments) {
    rows.push({
      key: 'payments',
      name: i18n.t('finances.payments'),
      ...payments,
      children: payments.children.map(payment => ({
        key: payment.id,
        name: getFormattedDate(payment.date),
        ...payment
      }))
    });
  }

  if (closedBalance) {
    rows.push({
      name: i18n.t('finances.closedBalance'),
      key: 'closedBalance',
      textStyle: {
        color: '#202030',
        fontWeight: 'bold'
      },
      ...closedBalance
    });
  }

  return rows;
};

const columns = [
  {
    title: i18n.t('finances.balanceType'),
    dataIndex: 'name',
    key: 'name',
    style: {
      flex: 1
    }
  },
  {
    title: i18n.t('generals.year'),
    dataIndex: 'year',
    key: 'year',
    style: {
      width: 50
    },
    render: year => year && getFormattedYear(year)
  },
  {
    title: i18n.t('finances.debt'),
    dataIndex: 'debt',
    key: 'debt',
    style: {
      width: 80
    },
    render: value => value && <OutputNumber value={value} fixedDecimalScale />
  },
  {
    title: i18n.t('finances.overpayment'),
    dataIndex: 'overpayment',
    key: 'overpayment',
    style: {
      width: 115
    },
    render: value => value && <OutputNumber value={value} fixedDecimalScale />
  }
];

const AgreementShowFinances = props => {
  const { entitie } = props;
  const { id } = entitie;

  const [dataSource, setDataSource] = useState([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (from, to) => {
    setIsError(false);
    setLoading(true);

    axios
      .get(`/api/v1/agreements/period/${id}`, {
        params: {
          from,
          to
        }
      })
      .then(response => {
        const data = transformData(response.data.data, from);

        setDataSource(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  };

  return (
    <FinancesTable
      columns={columns}
      dataSource={dataSource}
      isError={isError}
      loading={loading}
      onChangeHandler={onChangeHandler}
    />
  );
};

AgreementShowFinances.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(AgreementShowFinances);
