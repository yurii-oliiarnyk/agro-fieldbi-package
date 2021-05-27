import React from 'react';
import i18n from 'i18n-js';
import ResourcesListFilter from '../../../components/resource/ResourcesList/ResourcesListFilter';
import FormItem from '../../../components/UI/FormItem';
import FormikSelect from '../../../components/formik/FormikSelect';
import FormikTextInput from '../../../components/formik/FormikTextInput';
import FilterRadioSelect from '../../../components/common/FilterRadioSelect';

const CounterpartiesFilter = () => {
  return (
    <ResourcesListFilter name="dictionary/counterparties">
      <FormItem label={i18n.t('counterparty.type')}>
        <FormikSelect
          name="type"
          options={[
            {
              name: i18n.t('counterparty.typeIndividual'),
              id: '0'
            },
            {
              name: i18n.t('counterparty.typeLegal'),
              id: 1
            }
          ]}
          placeholder={i18n.t('counterparty.chooseType')}
        />
      </FormItem>

      <FormItem label={i18n.t('counterparty.code')}>
        <FormikTextInput name="code" placeholder={i18n.t('counterparty.typeCode')} />
      </FormItem>

      <FilterRadioSelect name="isOwnOrganization" label={i18n.t('counterparty.ownOrganization')} />
    </ResourcesListFilter>
  );
};

export default CounterpartiesFilter;
