import { UserType } from 'agro-package';

export type TaskType = {
  description?: string;
  id: number;
  point: [number, number];
  withPhoto: boolean;
  scoutingType: any;
};

export type TaskOfScoutingType = {
  id: number;
  status: number;
  author: UserType;
  executant: UserType;
  alternateExecutor?: UserType;
  dateCreation: number;
  dateExecution: number;
  comment: string;
  field: any;
  tasksList: TaskType[];
};
