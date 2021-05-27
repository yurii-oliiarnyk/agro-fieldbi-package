export const transformBalanceEntity = entity => {
  if (!entity) {
    return null;
  }

  const calcSum = entities => entities.reduce((acc, { total }) => acc + Number(total), 0);

  const hasBalances = entity.balances && entity.balances.length > 0;
  const hasCharges = entity.charges && entity.charges.length > 0;
  const hasPayments = entity.payments && entity.payments.length > 0;

  const isDebt = entity => entity.typeRemainder === 0 || entity.total === 0;
  const isOverpayment = entity => entity.typeRemainder === 1 || entity.total === 0;

  const transformedEntity = {};

  transformedEntity.openingBalance = {
    debt: isDebt(entity.openingBalance) ? entity.openingBalance.total : undefined,
    overpayment: isOverpayment(entity.openingBalance) ? entity.openingBalance.total : undefined
  };

  if (hasBalances) {
    const balance = entity.balances[0];
    const { total } = balance;

    const isBalanceDebt = isDebt(balance);

    transformedEntity.balances = {
      debt: isBalanceDebt ? total : undefined,
      overpayment: !isBalanceDebt ? total : undefined,
      children: [
        {
          id: balance.id,
          date: balance.date,
          debt: isBalanceDebt ? total : undefined,
          overpayment: !isBalanceDebt ? total : undefined
        }
      ]
    };
  }

  if (hasCharges) {
    transformedEntity.charges = {
      debt: calcSum(entity.charges),
      children: entity.charges.map(charge => ({
        id: charge.id,
        date: charge.date,
        debt: charge.total,
        year: charge.year
      }))
    };
  }

  if (hasPayments) {
    transformedEntity.payments = {
      overpayment: calcSum(entity.payments),
      children: entity.payments.map(payment => ({
        id: payment.id,
        date: payment.date,
        overpayment: payment.total,
        year: payment.year
      }))
    };
  }

  if (entity.closedBalance) {
    transformedEntity.closedBalance = {
      debt: isDebt(entity.closedBalance) ? entity.closedBalance.total : undefined,
      overpayment: isOverpayment(entity.closedBalance) ? entity.closedBalance.total : undefined
    };
  }

  return { ...transformedEntity, agreement: entity.agreement, dateFrom: entity.dateFrom };
};

export default transformBalanceEntity;
