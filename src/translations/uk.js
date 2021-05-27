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
  monitoring: {
    landLoad: 'При загрузці земельних ділянок відбулась помилка',
    fieldLoad: 'При загрузці полів відбулась помилка',
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
    signIn: 'Увійти',
    signOut: 'Вийти',
    emailPlaceholder: 'E-mail',
    passwordPlaceholder: 'Password',
    badCredentials: "Неправильне ім'я користувача або пароль",
  },
  blockedUser: {
    title: 'Доступ заблоковано(',
    description: 'Ваш обліковий запис заблокований Адміністратором акаунту',
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
  lands: 'Ділянки',
  map: 'Мапа',
  agreements: 'Договори',
  counterparties: 'Контрагенти',
  analytic: 'Аналітика',
  taskboard: 'Головна',
  tasks: 'Завдання',
  taskOfScout: 'Завдання на скаутинг',
  scoutingReport: 'Звіти про скаутинг',
  user: 'Користувач',
};

const binding = {
  sum: 'Сума',
  bindingWith: 'Перетинається з',
  area: 'Площа, %{unit}',
  field: {
    area: 'Площа поля, %{unit}',
    totalBindArea: 'Площа перетину з ділянками, %{unit}',
    totalNotBindArea: 'Площа не покрита ділянками, %{unit}',
    noIntersection: 'Полю не належить жодна земельна ділянка',
  },
  land: {
    area: 'Площа ділянки, %{unit}',
    totalBindArea: 'Площа перетину з полями, %{unit}',
    totalNotBindArea: 'Площа не покрита полями, %{unit}',
    noIntersection: 'Земельна ділянка не належить жодному полю',
  },
};

const land = {
  multiple: 'Земельні ділянки',
  singleName: 'Земельна ділянка',
  listName: 'Назва ділянки',
  withoutPolygon: 'Без контурів',
  withoutCadastralNumber: 'Без Кадастрового номеру',
  withoutAgreements: 'Без договору',
  intersectionArea: 'Площа за межами полів',
  withoutCadastralNumberLabel: '(без КН)',
  registrationNumber: 'Номер ділянки',
  cadastralNumber: 'Кадастровий номер',
  isInDemand: 'Не витребувана',
  fields: 'Поля',
  agreement: 'Договір',
  cadastralArea: 'Кадастрова площа',
  contourArea: 'Площа полігону',
  ngo1995: 'НГО 1995',
  ngoCurrent: 'НГО поточна',
  fieldOutside: 'За межами',
  landGetting: 'Отримання ділянки',
  landTransfer: 'Передача ділянки',
  notFound: 'Земельних ділянок не знайдено',
  notExist: 'Такої ділянки не існує. Спробуйте знову',
  tabs: {
    generals: 'Загальне',
    agreements: 'Договори',
    documents: 'Документи',
    purpose: 'Призначення',
    finances: 'Розрахунки',
  },
  docs: {
    stateAct: 'Державний акт',
    stateActSeries: 'Серія ДА',
    stateActNumber: 'Номер ДА',
    stateActIssuanceDate: 'Дата видачі ДА',
    statement: 'Відомість',
    statementSeries: 'Серія відомості',
    statementNumber: 'Номер відомості',
    statementIssuanceDate: 'Дата видачі відомості',
    extract: 'Витяг',
    extractSeries: 'Серія витягу',
    extractNumber: 'Номер витягу',
    extractIssuanceDate: 'Дата видачі витягу',
    certificate: 'Сертифікат',
    certificateSeries: 'Серія Сертифіката',
    certificateNumber: 'Номер Сертифіката',
    certificateIssuanceDate: 'Дата видачі сертифіката',
    isActOfDeliveryExists: 'Акт визнання',
    isDeclarationExists: 'Заява',
    isCopyOfPlanExists: 'Копія план-схеми',
    isCopyOfCadastralPlanExists: 'Копія кадастрового плану',
  },
};

const agreement = {
  singleName: 'Земельний договір',
  multiple: 'Договори',
  name: 'Договір',
  contractNumber: 'Номер договору',
  contractType: 'Вид договору',
  rentAgreement: 'Договір оренди',
  sublease: 'Договір суборенди',
  exchangeAgreement: 'Договір обміну',
  emphyteusisAgreement: 'Договір емфітевзису',
  additionalAgreement: 'Додаткова угода',
  subtype: 'Тип договору',
  chooseAgreementSubtype: 'Оберіть тип договору',
  chooseAgreementType: 'Оберіть вид договору',
  tenantOrganization: 'Організація-орендар',
  buyer: 'Покупець',
  landlord: 'Орендодавець',
  seller: 'Продавець',
  dateOfDocument: 'Дата документу',
  validFrom: 'Діє від',
  validUntil: 'Діє до',
  share: 'Доля паю',
  rentPercentage: 'Орендна плата %',
  rentAmount: 'Сума орендної плати',
  contractAmount: 'Сума договору',
  state: 'Стан договору',
  chooseState: 'Виберіть стан договору',
  registrar: 'Реєстратор',
  registrationDate: 'Дата реєстрації',
  comment: 'Коментар',
  hasActOfAcceptance: 'Є акт прийому-передачі',
  notFound: 'Договорів не знайдено',
  tabs: {
    generals: 'Загальне',
    addAgreements: 'Дод. Угоди',
    land: 'Ділянка',
    finances: 'Розрахунки',
  },
};

const counterparty = {
  count: {
    one: 'контрагент',
    singular: 'контрагенти',
    other: 'контрагентів',
  },
  multiple: 'Контрагенти',
  chooseType: 'Виберіть вид контрагента',
  type: 'Вид контрагента',
  listName: 'ПІБ або назва компанії',
  typeShort: 'Вид',
  typeLegal: 'Юридична особа',
  typeIndividual: 'Фізична особа',
  ipn: 'РНОКПП (ІПН)',
  erdpou: 'Код ЄДРПОУ',
  code: 'Код',
  typeCode: 'Введіть ЄДРПОУ / ІПН',
  passportSeries: 'Серія паспорта',
  passportNumber: 'Номер паспорта',
  ownOrganization: 'Власний контрагент',
  comment: 'Коментар',
  capable: 'Контрагент дієздатний',
  hasIpnCopy: 'Є копія ІПН',
  ipnChecked: 'ІПН перевірено',
  hasPassportCopy: 'Є копія паспорта',
  phoneNumber: 'Телефон основний',
  additionalPhoneNumber: 'Телефон резервний',
  contactPerson: 'Контактна особа',
  email: 'Електронна адреса',
  address: 'Прописка або юридична адреса',
  sameAddress: 'Адреси співпадають',
  addressActual: 'Фактична адреса місцезнаходження',
  tabs: {
    generals: 'Загальне',
    agreements: 'Договори',
  },
  notFound: 'Контрагентів не знайдено',
};

const landType = {
  singleName: 'Вид землі',
  choose: 'Оберіть вид землі',
};

const landPurpose = {
  singleName: 'Цільове призначення',
  choose: 'Оберіть цільове призначення',
};

const documentLocations = {
  singleName: 'Місцезнаходження документів',
};

const agronomistConclusion = {
  singleName: 'Заключення агронома',
};

const soilType = {
  singleName: 'Тип грунту',
  choose: 'Оберіть тип грунту',
};

const user = {
  name: "Ім'я користувача",
  email: 'E-mail',
  role: 'Роль',
  roles: {
    user: 'Користувач',
    admin: 'Адмін',
  },
};

const taskboard = {
  fields: {
    name: 'Поля',
    subtitle: 'Кількість полів',
    unit: 'полів',
    intersectionPercentage: 'Відсоток шахматки \nна полях',
  },
  lands: {
    name: 'Ділянки',
    unit: 'ділянок',
    unitShort: 'діл.',
    subtitle: 'Кількість ділянок',
    withoutCadastralNumber: 'Без кадастрового \nномеру',
    withoutAgreements: 'Без договору',
    areOwned: 'Знаходяться \nу власності',
    noStateAct: 'Відсутній \nдержавний акт',
    noExtract: 'Відсутній витяг',
  },
  agreements: {
    name: 'Договори',
    subtitle: 'Кількість договорів',
    unitShort: 'дог.',
    unit: 'договорів',
    countOfOverdueAgreements: 'Прострочені',
    countOfAgreementsThatEndThisYear: 'Закінчуються \nу цьому році',
    receivedInExchange: 'Отримано в обмін',
    transferredInExchange: 'Передано в обмін',
    acquiredOnEmphyteusis: 'Придбано \nпо емфітевзису',
    thereIsNoStateRegistration: 'Відсутня \nдержреєстрація',
    hasPurchaseLand: 'Є першочергове право \nна викуп землі',
    documentLocationIsNull: 'Відсутнє місце-\nзнаходження документів',
    isNotCopyOfTheDocument: 'Відсутня копія договору',
    isAutomaticContinuationExist: 'Є автоматичне продовження',
  },
  finances: {
    name: 'Фінанси',
    subtitle: 'Заборгованість по орендній платі',
    isDebtOnCounterparties: 'По контрагентах \nє заборгованість',
    isOverpaymentOnCounterparties: 'По контрагентах \nє переплата',
    amountOverpaymentRent: 'Сума переплати \nпо оренді',
    averageSalaryPerHectare: 'Середня плата за гектар',
    averageFeePerShare: 'Середня плата за пай',
    counterpartiesHaveNoInitialBalances: 'У контрагентів відсутні початкові залишки',
  },
  counterparties: {
    name: 'Контрагенти',
    subtitle: 'Активних контрагентів',
    userUnit: 'осіб',
    individualsLabel: 'фіз. особи',
    isNoCopyOfTheTin: 'Відсутня копія ІПН',
    noCopyOfPassport: 'Відсутня копія паспорту',
    missingPhone: 'Відсутній телефон \n(основний)',
    noBankCard: 'Відсутня банківська \nкартка',
    worksWithACompetitor: 'Працює з конкурентом',
    hasAnHeir: 'Має спадкоємця',
  },
  users: {
    name: 'Активність',
    subtitle: 'Журнал активностей',
    userActivities: 'Активні користувачі',
    userEntities: 'Активні сутності',
    notActions: 'Дії за поточний місяць відсутні',
    actions: {
      one: 'дія',
      singular: 'дії',
      other: 'дій',
    },
  },
  filter: {
    selectSubdivion: 'Оберіть підрозділи',
  },
  areaUnit: 'гектарів',
  noСontours: 'Без контурів',
  withoutSubdivision: 'Без підрозділу',
};

const analytics = {
  selectSubdivion: 'Оберіть підрозділи',
  subdivisionError: 'Не вдалось завантажити підрозділи',
  action: 'Показати аналітику',
  error: 'Не вдалось завантажити аналітику',
  tabs: {
    area: 'Площа',
    count: 'Кількість',
  },
  generals: {
    name: 'Загальні відомості',
    fieldsCount: 'Кількість полів, од',
    fieldsTillableArea: 'Площа полів, га',
    landsCount: 'Кількість ділянок, од',
    landsArea: 'Кадастрова площа ділянок, га',
    landsPolygonArea: 'Площа полігонів ділянок, га',
    fieldsRentedAreaTotal: 'Площа перетину ділянок з полями, га',
    rent: 'Оренда, га',
    exchange: 'Обмін, га',
    withoutAgreements: 'Без договору, га',
    fieldsNotRentedArea: 'Площа полів без перетину з ділянками, га',
    fieldsRentedOutsideAreaTotal: 'Площа ділянок без перетину з полями, га',
  },
  landType: {
    name: 'Види землі',
    landsCount: 'Кількість ділянок, од',
    landsArea: 'Площа ділянок, га',
  },
  agreementYear: {
    name: 'Роки завершення',
    count: 'Кількість договорів, од',
    landsArea: 'Площа ділянок, га',
  },
  landPurpose: {
    name: 'Цільове призначення',
    landsCount: 'Кількість ділянок, од',
    landsArea: 'Площа ділянок, га',
  },
  agreementState: {
    name: 'Стани договорів',
    agreementsCount: 'Кількість договорів, од',
    landsArea: 'Площа ділянок, га',
  },
  agronomistConclusion: {
    name: 'Заключення агронома',
    agreementsCount: 'Кількість договорів, од',
    landsArea: 'Площа ділянок, га',
  },
  soilType: {
    name: 'Типи грунтів',
    agreementsCount: 'Кількість договорів, од',
    landsArea: 'Площа ділянок, га',
  },
  documentLocation: {
    name: 'Місцезнаходження документів',
    agreementsCount: 'Кількість договорів, од',
    landsArea: 'Площа ділянок, га',
  },
};

const finances = {
  balanceType: 'Вид залишку чи обороту',
  debt: 'Борг, грн',
  overpayment: 'Переплата, грн',
  openingBalance: 'Початкове сальдо',
  balance: 'Початковий залишок',
  charges: 'Нарахування за оренду',
  payments: 'Оплата за оренду',
  closedBalance: 'Кінцеве сальдо',
  currentMonth: 'Поточний місяць',
  prevMonth: 'Попередній місяць',
  currentQuarter: 'Поточний квартал',
  prevQuarter: 'Попередній квартал',
  currentYear: 'Поточний рік',
  prevYear: 'Попередній рік',
  period: 'Період розрахунків',
};

const tasks = {
  notFound: 'Завдань не знайдено',
  listName: 'Назва завдання',
  responsible: 'Відповідальний',
  author: 'Автор',
  observer: 'Спостерігач',
  observers: 'Спостерігачі',
  tag: 'Тег',
  tags: 'Теги',
  chooseTag: 'Оберіть тег',
  createdAtDate: 'Дата створення',
  createdAt: 'Створено',
  deadline: 'Крайній термін',
  link: 'Посилання',
  chooseAuthor: 'Виберіть автора',
  chooseObserver: 'Виберіть спостерігача',
  chooseResponsible: 'Обрати відповідального',
  status: {
    choose: 'Оберіть статус',
    label: 'Статус',
    complete: 'Завершене',
    inProgress: 'В роботі',
    new: 'Нове',
    success: 'Статус завдання змінено успішно',
    failed: 'Не вдалось змінити статус завдання',
  },
};

const comments = {
  new: 'Додати коментар',
  deleteConfirm: 'Видалити коментар?',
  deleteMessage: 'Як тільки ви видалите коментар, він буде втрачений на завжди.',
  action: 'Коментувати',
  save: 'Зберегти',
  cancel: 'Відмінити',
  updated: 'Відредаговано',
  showPrevious: 'Показати попередні коментарі',
};

const otherEntities = {
  users: 'Користувачі',
  contractState: 'Стани договорів',
  edrpouSearch: 'Пошук по ЄДРПОУ',
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
  binding,
  land,
  agreement,
  agronomistConclusion,
  landPurpose,
  landType,
  otherEntities,
  tasks,
  analytics,
  finances,
  comments,
  counterparty,
  documentLocations,
  soilType,
  taskboard,
  user,
};
