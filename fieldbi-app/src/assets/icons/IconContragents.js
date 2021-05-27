import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconContragents = props => {
  const { color = '#000' } = props;

  const icon = `
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke=${color} stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
<path d="M5 11C6.10457 11 7 10.1046 7 9C7 7.89543 6.10457 7 5 7C3.89543 7 3 7.89543 3 9C3 10.1046 3.89543 11 5 11Z" />
<path d="M17 11C18.1046 11 19 10.1046 19 9C19 7.89543 18.1046 7 17 7C15.8954 7 15 7.89543 15 9C15 10.1046 15.8954 11 17 11Z" />
<path d="M11 17C12.1046 17 13 16.1046 13 15C13 13.8954 12.1046 13 11 13C9.89543 13 9 13.8954 9 15C9 16.1046 9.89543 17 11 17Z" />
<path d="M7 21C7 18.791 8.791 17 11 17C13.209 17 15 18.791 15 21H7Z" />
<path d="M11 5C12.1046 5 13 4.10457 13 3C13 1.89543 12.1046 1 11 1C9.89543 1 9 1.89543 9 3C9 4.10457 9.89543 5 11 5Z" />
<path d="M13.999 6.355C13.377 7.06 13 7.986 13 9H9.00005C9.00005 7.986 8.62305 7.06 8.00105 6.355L7.99805 6.356C8.73105 5.525 9.80405 5 11 5C12.197 5 13.272 5.526 14.005 6.36" />
<path d="M14.001 12.355C14.623 13.06 15 13.986 15 15H21C21 12.791 19.209 11 17 11C15.805 11 14.732 11.524 13.999 12.355" />
<path d="M8 12.354C7.378 13.059 7 13.985 7 15H1C1 12.791 2.791 11 5 11C6.195 11 7.268 11.524 8 12.354Z" />
</svg>

`;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconContragents;
