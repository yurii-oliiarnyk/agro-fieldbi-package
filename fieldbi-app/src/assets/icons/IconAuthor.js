import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconAuthor = props => {
  const { color = '#000' } = props;

  const icon = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9803 0L6.72738 5.25293L7.48215 6.0077L2.05625 9.88328L0 18.9896L1.01039 20L10.1168 17.9437L13.9924 12.5179L14.7471 13.2726L20 8.01973L11.9803 0ZM9.42199 16.8978L2.33059 18.4991L7.39164 13.438C7.78289 13.5422 8.21746 13.4413 8.52434 13.1343C8.98254 12.6761 8.98254 11.9333 8.52434 11.4751C8.06613 11.0169 7.32328 11.0169 6.86512 11.4751C6.55797 11.7823 6.45707 12.2173 6.56172 12.6087L1.50098 17.6695L3.10227 10.578L8.32332 6.84875L13.1513 11.6768L9.42199 16.8978ZM14.6837 11.55L8.45008 5.31633L8.38664 5.25289L11.9803 1.65926L18.3408 8.01973L14.7471 11.6134L14.6837 11.55Z" fill="${color}" />
    </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconAuthor;