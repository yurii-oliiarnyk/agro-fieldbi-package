import moment from 'moment';

export const emptyPoint = {
  name: '',
  photos: [],
  comment: '',
  analyses: [],
};

export const emptyEntity = {
  field: null,
  date: moment().unix(),
  comment: null,
  points: [emptyPoint],
};
