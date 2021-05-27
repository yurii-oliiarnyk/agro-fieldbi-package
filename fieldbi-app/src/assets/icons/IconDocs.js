import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconDocs = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" stroke=${color} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 1H1V17H13V1Z" />
    <path d="M13 3H15V19H3V17" />
    <path d="M15 5H17V21H5V19" />
    <path d="M3 4.5H11" />
    <path d="M3 7.5H11" />
    <path d="M3 10.5H11" />
    <path d="M3 13.5H11" />
  </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconDocs;
