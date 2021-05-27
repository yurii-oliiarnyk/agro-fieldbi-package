import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconGenerals = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 17H3C1.895 17 1 16.105 1 15V3C1 1.895 1.895 1 3 1H19C20.105 1 21 1.895 21 3V15C21 16.105 20.105 17 19 17Z"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11 21L15 17H7L11 21Z"  stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 4H10V6H12V4Z" />
    <path d="M12 8H10V14H12V8Z" />
  </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconGenerals;
