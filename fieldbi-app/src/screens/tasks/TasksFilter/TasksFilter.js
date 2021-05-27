import React from 'react';
import i18n from 'i18n-js';
import ResourcesListFilter from '../../../components/resource/ResourcesList/ResourcesListFilter';
import DateRangeInput from '../../../components/common/DateRangeInput';
import FormItem from '../../../components/UI/FormItem';
import FormikAjaxSelect from '../../../components/formik/FormikAjaxSelect';
import FormikSelect from '../../../components/formik/FormikSelect';
import { statusOptions } from '../config';
import { transformFilterFields, parseFilterFields } from '../utils';

const TasksFilter = () => {
  return (
    <ResourcesListFilter
      name="tasks"
      transformFilterFields={transformFilterFields}
      parseFilterFields={parseFilterFields}
    >
      <FormItem label={i18n.t('tasks.status.label')}>
        <FormikSelect
          name="statuses"
          options={statusOptions.map(option => ({ name: option.label, id: option.value }))}
          placeholder={i18n.t('tasks.status.choose')}
        />
      </FormItem>

      <DateRangeInput name="createdAt" label={i18n.t('tasks.createdAtDate')} />
      <DateRangeInput name="deadline" label={i18n.t('tasks.deadline')} />

      <FormItem label={i18n.t('tasks.author')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/select-options/users"
          name="author"
          placeholder={i18n.t('tasks.chooseAuthor')}
        />
      </FormItem>

      <FormItem label={i18n.t('tasks.observer')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/select-options/users"
          name="observers"
          placeholder={i18n.t('tasks.chooseObserver')}
        />
      </FormItem>

      <FormItem label={i18n.t('tasks.responsible')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/select-options/users"
          name="responsible"
          placeholder={i18n.t('tasks.chooseResponsible')}
        />
      </FormItem>

      <FormItem label={i18n.t('tasks.tag')}>
        <FormikAjaxSelect
          apiUrl="/api/v1/dictionary/tags"
          name="tags"
          placeholder={i18n.t('tasks.chooseTag')}
        />
      </FormItem>
    </ResourcesListFilter>
  );
};

export default TasksFilter;
