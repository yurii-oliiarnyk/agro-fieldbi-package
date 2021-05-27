import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconMap = props => {
  const { color = '#000' } = props;

  const icon = `
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" stroke=${color} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19L1 21V3L6 1V19Z" />
      <path d="M11 21L6 19V1L11 3V21Z" />
      <path d="M16 19L11 21V3L16 1V19Z" />
      <path d="M21 21L16 19V1L21 3V21Z" />
    </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconMap;
