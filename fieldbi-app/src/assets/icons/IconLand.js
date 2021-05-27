import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconLand = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" stroke=${color} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 7L11 1L21 7L11 13L1 7Z" />
    <path d="M18.502 11.501L21 13L11 19L1 13L3.5 11.5" />
    <path d="M18.502 8.501L21 10L11 16L1 10L3.5 8.5" />
    <path d="M16 4L6 10" />
    <path d="M6 4L16 10" />
  </svg>
`;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconLand;
