import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconField = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16.1042C10.833 5.93822 1 9.00022 1 9.00022V21.0002H21V9.00022C21 9.00022 17.875 6.00022 9.189 9.11822" />
    <path d="M1 10.917C1 10.917 10.566 8.71804 21 21" />
    <path d="M15.125 21.0001C15.125 21.0001 10 14.5 4 15.0001" />
    <path d="M3 5C4.10457 5 5 4.10457 5 3C5 1.89543 4.10457 1 3 1C1.89543 1 1 1.89543 1 3C1 4.10457 1.89543 5 3 5Z" />
  </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconField;
