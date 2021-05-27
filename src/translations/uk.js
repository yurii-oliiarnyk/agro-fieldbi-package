const ui = {
  loading: 'Завантаження...',
  noData: 'Немає даних',
  close: 'Закрити',
  dataNotLoaded: 'Не вдалось завантажити дані',
  back: 'Назад',
  filter: {
    title: 'Фільтр',
    from: 'Від',
    to: 'До',
    clear: 'Скинути всі',
    action: 'Фільтрувати',
    cancel: 'Закрити',
  },
  datePicker: {
    clear: 'Очистити',
  },
  radioSelect: {
    all: 'Всі значення',
  },
};

const generals = {
  idFullName: 'Унікальний ідентифікатор',
  yes: 'Так',
  no: 'Ні',
  all: 'Всі',
  year: 'Рік',
  noDataSymbol: '—',
  description: 'Опис',
  areaUnits: 'га',
  currencyUnits: 'грн',
  dataNotStored: 'Дані не заповнені',
  name: 'Назва',
  fullName: 'ПІБ',
  landBank: 'Земельний банк',
  edit: 'Редагувати',
  save: 'Зберегти',
  cancel: 'Закрити',
  create: 'Створити',
  delete: 'Видалити',
  uahPerHectare: 'грн/га',
  uahPerShare: 'грн/пай',
};

const errors = {
  error: 'Помилка',
  noAccess: 'У вас недостатньо прав для виконання даної операції',
  unauthorized: 'Час сесії минув, будь ласка, авторизуйтесь знову',
  noPermissions: 'Немає доступу',
  noLocationPermissions: 'Проблеми з доступом до геоданих пристрою',
  resources: {
    load: 'При загрузці ресурсів відбулась помилка',
    loadSingle: 'При загрузці ресурсу відбулась помилка',
    createError: 'При створенні ресурсу відбулась помилка',
    updateError: 'При редагуванні ресурсу відбулась помилка',
  },
};

const monitoring = {
  pageName: 'Мапа',
  showOnMap: 'Показати на мапі',
  fields: 'Поля',
  lands: 'Ділянки',
  search: {
    lands: 'Назва ділянки',
    fields: 'Назва поля',
    fieldsNotFound: 'Полів не знайдено',
    landsNotFound: 'Ділянок не знайдено',
  },
};

const field = {
  name: 'Поле',
  multiple: 'Поля',
  listName: 'Назва поля',
  tillableArea: 'Оброблювальна площа',
  irrigated: 'Поливне',
  additionalInfo: 'Додаткова інформація',
  location: '%{region} обл., %{district} р-н',
  withoutPolygon: 'Без контурів',
  withoutPaint: 'Без покриття',
  notFound: 'Полів не знайдено',
  notExist: 'Такого поля не існує. Спробуйте знову',
  tabs: {
    generals: 'Загальне',
    lands: 'Ділянки',
  },
};

const subdivision = {
  singleName: 'Підрозділ',
  multiple: 'Підрозділи',
  choose: 'Оберіть підрозділ',
  rootSubdivision: 'Кореневий підрозділ',
  nullSubdivision: 'Без підрозділу',
};

const locations = {
  name: 'Населений пункт',
  region: 'Область',
  district: 'Район',
  villageCouncil: 'Сільрада',
  locality: 'Населенний пункт',
};

const locationFields = {
  name: 'Населений пункт',
  region: 'Область',
  choseRegion: 'Оберіть область',
  choseRegionAtFirst: 'Спершу оберіть область',
  district: 'Район',
  choseDistrict: 'Оберіть район',
  choseDistrictAtFirst: 'Спершу оберіть район',
  villageCouncil: 'Сільрада',
  choseVillageCouncil: 'Оберіть сільраду',
  choseVillageCouncilAtFirst: 'Спершу оберіть район',
  locality: 'Населенний пункт',
  choseLocality: 'Оберіть населенний пункт',
};

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
  ui,
  generals,
  errors,
  monitoring,
  field,
  subdivision,
  locations,
  locationFields,
  authorization,
  taskOfScout,
  scoutingReport,
  pages,
};
