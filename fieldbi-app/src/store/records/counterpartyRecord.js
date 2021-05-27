import { Record } from 'immutable';

const CounterpartyRecord = Record({
  id: null,
  name: null,
  isOwnOrganization: null,
  type: null,
  code: null,
  passportSeries: null,
  passportNumber: null,
  comment: null,
  capable: null,
  phoneNumber: null,
  additionalPhoneNumber: null,
  contactPerson: null,
  email: null,
  address: null,
  sameAddress: null,
  addressActual: null,
  hasIpnCopy: null,
  ipnChecked: null,
  hasPassportCopy: null
});

export default CounterpartyRecord;
