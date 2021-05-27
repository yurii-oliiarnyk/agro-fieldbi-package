import i18n from 'i18n-js';

export const STATUS_CONSTANT = {
  NEW: 0,
  PROGRESS: 1,
  COMPLETE: 2
};

export const statusOptions = [
  {
    value: STATUS_CONSTANT.NEW,
    label: i18n.t('tasks.status.new'),
    color: '#00a1ff'
  },
  {
    value: STATUS_CONSTANT.PROGRESS,
    label: i18n.t('tasks.status.inProgress'),
    color: '#ffa800'
  },
  {
    value: STATUS_CONSTANT.COMPLETE,
    label: i18n.t('tasks.status.complete'),
    color: '#1ed700'
  }
];

export const getCurrentStatus = status => statusOptions.find(option => option.value === status);
