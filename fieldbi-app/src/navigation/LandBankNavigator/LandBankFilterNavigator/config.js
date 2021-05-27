import React from 'react';
import FieldFilter from '../../../screens/fields/FieldFilter';
import LandFilter from '../../../screens/lands/LandFilter';
import AgreementsFilter from '../../../screens/agreements/AgreementsFilter';
import CounterpartiesFilter from '../../../screens/counterparties/CounterpartiesFilter';

const landBankFilterConfig = {
  fields: {
    component: <FieldFilter />
  },
  lands: {
    component: <LandFilter />
  },
  agreements: {
    component: <AgreementsFilter />
  },
  'dictionary/counterparties': {
    component: <CounterpartiesFilter />
  }
};

export const getLandBankFilterScreen = resoure => {
  return landBankFilterConfig?.[resoure]?.component ?? null;
};
