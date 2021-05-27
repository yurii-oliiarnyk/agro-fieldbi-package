import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconMap = props => {
  const { color = '#000' } = props;

  const icon = `
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} xmlns="http://www.w3.org/2000/svg">
      <path d="M11 11C8.79 11 7 9.21 7 7V5C7 2.79 8.79 1 11 1C13.21 1 15 2.79 15 5V7C15 9.21 13.21 11 11 11Z" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 16.2L6.5 11.2L8 9.69995L11 14.7L9 16.2Z" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13 16.2L15.5 11.2L14 9.69995L11 14.7L13 16.2Z" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.1 12H16C18.76 12 21 14.24 21 17V21H1V17C1 14.24 3.24 12 6 12H6.9" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15 4.96001C14.62 4.74001 14.29 4.46001 14 4.14001C13.27 4.97001 12.19 5.49001 11 5.49001C9.81 5.49001 8.73 4.97001 8 4.14001C7.71 4.46001 7.38 4.74001 7 4.96001" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.5 15.8101L10.3 17.3101L9.8 21.0001" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.5 15.8101L11.7 17.3101L12.2 21.0001" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.7 17.3101H10.3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconMap;
