import i18n from 'i18n-js';
import moment from 'moment';
import 'moment/locale/uk';

import en from './en';
import uk from './uk';

i18n.translations = { en, uk };
i18n.locale = 'uk';

moment.locale('uk');

export default i18n;
