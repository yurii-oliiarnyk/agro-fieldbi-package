const authorization = {
  instance: {
    title: 'Робочий простір',
    help: 'Це адреса, яку ви використовуєте для входу у AgriBI',
    submit: 'Далі',
    notValid: 'Адреса не вірна',
    change: 'Змінити робочий простір',
  },
  auth: {
    signInTitle: 'Увійти',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Password',
    badCredentials: "Неправильне ім'я користувача або пароль",
  },
};

const taskOfScout = {
  name: 'Завдання на скаутинг',
  listName: 'Назва завдання',
  search: 'Пошук',
  notFound: 'Завдань не знайдено',
  dateCreation: 'Дата створення',
  dateExecution: 'Дата виконання',
  status: 'Статус',
  statuses: {
    new: 'Нове',
    inWork: 'В роботі',
    rejected: 'Відхилене',
    done: 'Виконанне',
  },
  subdvision: 'Підрозділ',
  field: 'Поле',
  author: 'Автор',
  executant: 'Виконавець',
  alternateExecutor: 'Дублер',
  comment: 'Коментар',
};

const scoutingReport = {
  name: 'Звіт про скаутинг',
  listName: 'Назва звіту про скаутинг',
  notFound: 'Звітів не знайдено',
  create: 'Створити звіт',
  modal: {
    title: 'Звіт про скаутинг',
    name: 'Створити звіт про скаутинг для поля',
  },
  field: 'Поле',
  date: 'Дата виконання',
};

const pages = {
  fields: 'Поля',
  map: 'Мапа',
  taskOfScout: 'Завдання на скаутинг',
  scoutingReport: 'Звіти про скаутинг',
};

export default {
  authorization,
  pages,
  taskOfScout,
  scoutingReport,
};
