import { Record } from 'immutable';

const AgreementRecord = Record({
  id: null,
  type: null,
  subtype: null,
  parent: null,
  land: null,
  tenantOrganization: null,
  landlord: null,
  agreementNumber: null,
  dateOfCreation: null,
  dateOfRegistration: null,
  comment: null,
  validFromDate: null,
  validByDate: null,
  ngoCurrent: null,
  rentPercentage: null,
  rentAmount: null,
  registrar: null,
  state: null,
  landShortData: null,
  tenantOrganizationShortData: null,
  landlordShortData: null,
  stateShortData: null,
  hasActOfAcceptance: null,
  share: null,
  documentLocation: null,
  documentLocationShortData: null,
  children: null
});

export default AgreementRecord;
