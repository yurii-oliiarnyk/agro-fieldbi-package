import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconContracts = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} stroke-miterlimit="10" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5149 19.0681L19.5859 11.9971L20.9999 13.4111L13.9289 20.4821" />
    <path d="M11.9969 21.0001L13.9289 20.4821L12.5149 19.0681L11.9969 21.0001Z" stroke-linejoin="round"/>
    <path d="M9.997 21H1V1H17V10.583" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 4H4V6H14V4Z" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 10H4V12H14V10Z" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 16H4V18H10V16Z" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconContracts;
