import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconTasks = props => {
  const { color = '#000' } = props;

  const icon = `
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="${color}">
      <path d="M13 13V5.41421C13 5.149 12.8946 4.89464 12.7071 4.70711L9.29289 1.29289C9.10536 1.10536 8.851 1 8.58579 1H2C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H9" />
      <circle cx="13" cy="17" r="4" />
      <path d="M11 16L13 18L17 14"  stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 5H9"  stroke-linecap="round"/>
      <path d="M3 8H11"  stroke-linecap="round"/>
      <path d="M3 11H10"  stroke-linecap="round"/>
      <path d="M3 14H8"  stroke-linecap="round"/>
    </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconTasks;
