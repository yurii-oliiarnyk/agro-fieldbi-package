import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconPurpose = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 21C7.20914 21 9 19.2091 9 17C9 14.7909 7.20914 13 5 13C2.79086 13 1 14.7909 1 17C1 19.2091 2.79086 21 5 21Z" />
    <path d="M11 9C13.2091 9 15 7.20914 15 5C15 2.79086 13.2091 1 11 1C8.79086 1 7 2.79086 7 5C7 7.20914 8.79086 9 11 9Z" />
    <path d="M17 21C19.2091 21 21 19.2091 21 17C21 14.7909 19.2091 13 17 13C14.7909 13 13 14.7909 13 17C13 19.2091 14.7909 21 17 21Z" />
    <path d="M14.1719 14.172L10.9999 12L7.8269 14.173" />
    <path d="M11 9V12" />
  </svg>`;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconPurpose;
