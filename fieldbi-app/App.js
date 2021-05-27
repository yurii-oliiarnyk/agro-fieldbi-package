import React from 'react';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
import Root from './src/Root';

Sentry.init({
  dsn: 'https://92cea3c6ecbb4a5c972156eaccb60640@o424417.ingest.sentry.io/5412283'
});

const App = () => <Root />;

export default codePush(App);
