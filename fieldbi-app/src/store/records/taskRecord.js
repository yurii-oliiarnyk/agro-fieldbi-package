import { Record } from 'immutable';

const TaskRecord = Record({
  id: null,
  status: null,
  title: null,
  description: null,
  author: null,
  responsible: null,
  observers: null,
  createdAt: null,
  deadline: null,
  link: null,
  tags: null,
  content: null
});

export default TaskRecord;
