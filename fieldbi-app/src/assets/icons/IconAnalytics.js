import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconAnalytics = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 15H2V21H5V15Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 10H7V21H10V10Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 13H12V21H15V13Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 8H17V21H20V8Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1 21H21"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.5 4C19.3284 4 20 3.32843 20 2.5C20 1.67157 19.3284 1 18.5 1C17.6716 1 17 1.67157 17 2.5C17 3.32843 17.6716 4 18.5 4Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.5 9C14.3284 9 15 8.32843 15 7.5C15 6.67157 14.3284 6 13.5 6C12.6716 6 12 6.67157 12 7.5C12 8.32843 12.6716 9 13.5 9Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 6C9.32843 6 10 5.32843 10 4.5C10 3.67157 9.32843 3 8.5 3C7.67157 3 7 3.67157 7 4.5C7 5.32843 7.67157 6 8.5 6Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.5 11C4.32843 11 5 10.3284 5 9.5C5 8.67157 4.32843 8 3.5 8C2.67157 8 2 8.67157 2 9.5C2 10.3284 2.67157 11 3.5 11Z"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5601 6.44006L17.4401 3.56006"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.79004 5.27002L12.21 6.73002"  stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4.56006 8.44006L7.44006 5.56006" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconAnalytics;
