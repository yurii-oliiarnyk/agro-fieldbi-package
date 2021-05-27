import React, { useState } from 'react';
import moment from 'moment';
import i18n from 'i18n-js';
import PropTypes from 'prop-types';
import withResourceShow from '../../../components/resource/ResourcesShow/withResourceShow';
import OutputNumber from '../../../components/UI/OutputNumber';
import { getFormattedDate, getFormattedYear } from '../../../helpers';
import FinancesTable, { transformBalanceEntity } from '../../../components/common/FinancesTable';
import axios from '../../../axios/axios';

const transformData = finances => {
  finances = finances.map(finance => transformBalanceEntity(finance)).filter(finance => !!finance);

  if (!finances.length) {
    return [];
  }

  const rows = [];

  const hasFinanceEntities = paramKey => {
    return (
      finances.filter(finance => !!(finance[paramKey] && finance[paramKey].children)).length > 0
    );
  };

  const getTotal = paramKey =>
    finances.reduce(
      (acc, finance) => {
        const { [paramKey]: param = {} } = finance;
        const { debt, overpayment } = param;

        const updatedDebt = typeof debt !== 'undefined' ? debt + Number(acc.debt) : acc.debt;
        const updatedOverpayment =
          typeof overpayment !== 'undefined'
            ? overpayment + Number(acc.overpayment)
            : acc.overpayment;

        return {
          debt: updatedDebt,
          overpayment: updatedOverpayment
        };
      },
      {
        debt: null,
        overpayment: null
      }
    );

  const getChild = paramKey => {
    return finances
      .filter(finance => !!(finance[paramKey] && finance[paramKey].children))
      .flatMap(finance =>
        finance[paramKey].children.map(child => ({ ...child, agreement: finance.agreement }))
      )
      .map(finance => {
        const name = finance.date ? getFormattedDate(finance.date) : undefined;

        return {
          key: `${paramKey}-${finance.id}`,
          agreement: finance.agreement,
          name,
          ...finance
        };
      })
      .sort((a, b) => a.date - b.date);
  };

  const getSaldoChild = paramKey =>
    finances.map(finance => ({
      key: `${paramKey}-${finance.agreement.id}`,
      agreement: finance.agreement,
      ...finance[paramKey]
    }));

  rows.push({
    key: 'openingBalance',
    name: i18n.t('finances.openingBalance'),
    ...getTotal('openingBalance'),
    children: getSaldoChild('openingBalance')
  });

  if (moment().unix() < moment(finances[0].dateFrom).unix()) {
    return rows;
  }

  if (hasFinanceEntities('balances')) {
    rows.push({
      key: 'balances',
      name: i18n.t('finances.balance'),
      ...getTotal('balances'),
      children: getChild('balances')
    });
  }

  if (hasFinanceEntities('charges')) {
    rows.push({
      key: 'charges',
      name: i18n.t('finances.charges'),
      ...getTotal('charges'),
      children: getChild('charges')
    });
  }

  if (hasFinanceEntities('payments')) {
    rows.push({
      key: 'payments',
      name: i18n.t('finances.payments'),
      ...getTotal('payments'),
      children: getChild('payments')
    });
  }

  rows.push({
    key: 'closedBalance',
    name: i18n.t('finances.closedBalance'),
    ...getTotal('closedBalance'),
    children: getSaldoChild('closedBalance')
  });

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
    title: i18n.t('agreement.name'),
    dataIndex: 'agreement',
    key: 'agreement',
    style: {
      width: 80
    },
    render: agreement => {
      if (!agreement) {
        return null;
      }

      return agreement.agreementNumber;
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
  const { agreements } = entitie;

  const ids = agreements.map(agreement => agreement.id);

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isError, setIsError] = useState(false);

  const onChangeHandler = (from, to) => {
    if (!ids.length) {
      return;
    }

    setIsError(false);
    setLoading(true);

    axios
      .get(`/api/v1/agreements/trial-balance/`, {
        params: {
          ids,
          from,
          to
        }
      })
      .then(response => {
        const data = transformData(response.data.data);

        setDataSource(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  };

  return (
    <FinancesTable
      loading={loading}
      columns={columns}
      isError={isError}
      dataSource={dataSource}
      onChangeHandler={onChangeHandler}
    />
  );
};

AgreementShowFinances.propTypes = {
  entitie: PropTypes.object.isRequired
};

export default withResourceShow(AgreementShowFinances);
