export type ModulesType = Array<'module_field' | 'module_agro'>;

export type UserType = {
  id: number;
  email: string;
  name: string;
  roles: string[];
  enabledModules: ModulesType;
  defaultModule: string | null;
  permissions: string[];
  status: 1 | 0;
  subdivision: number[];
};
