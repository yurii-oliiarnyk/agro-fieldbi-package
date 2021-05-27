import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconAddAgreements = props => {
  const { color = '#000' } = props;

  const icon = `
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 21H3C1.9 21 1 20.11 1 19V17H13V19C13 20.11 13.9 21 15 21Z" />
      <path d="M21 3V5H17V3C17 1.9 17.9 1 19 1C20.11 1 21 1.9 21 3Z" />
      <path d="M17 3V19" />
      <path d="M5 17V3" />
      <path d="M17 3C17 1.895 17.895 1 19 1C20.105 1 21 1.895 21 3" />
      <path d="M5 3C5 1.895 5.895 1 7 1H19" />
      <path d="M1 19C1 20.105 1.895 21 3 21H15" />
      <path d="M17 19C17 20.105 16.105 21 15 21C13.895 21 13 20.105 13 19" />
      <path d="M1 19V17H13V19" />
      <path d="M21 3V5H17" />
      <path d="M9.03491 10.3719L10.0969 11.4339L12.9649 8.56592" />
    </svg>`;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconAddAgreements;
