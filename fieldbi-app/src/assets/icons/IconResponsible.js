import React from 'react';
import { SvgXml } from 'react-native-svg';

const IconAuthor = props => {
  const { color = '#000' } = props;

  const icon = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-outside-1" maskUnits="userSpaceOnUse" x="-0.5" y="3" width="21" height="14" fill="black">
    <rect fill="white" x="-0.5" y="3" width="21" height="14"/>
    <path d="M18.2303 13.541C18.1814 12.0024 17.6971 10.5091 16.8336 9.23457L16.9481 9.12019C17.3513 8.72041 17.51 8.13537 17.3639 7.5867C17.2176 7.03788 16.789 6.60931 16.2402 6.46305C15.6915 6.31695 15.1065 6.47559 14.7067 6.87877L14.5942 6.99129C13.6843 6.37855 12.6612 5.95354 11.5848 5.7415V5.58487C11.5848 4.70963 10.8753 4 9.99992 4C9.12468 4 8.41505 4.70963 8.41505 5.58487V5.7415C7.33876 5.95339 6.31571 6.37808 5.4058 6.99067L5.29328 6.87815C4.67357 6.26386 3.6739 6.26603 3.05682 6.88311C2.43974 7.50019 2.43757 8.49986 3.05187 9.11957L3.1664 9.23395C2.30292 10.5087 1.81864 12.0022 1.76973 13.541C0.973888 13.7025 0.428778 14.4396 0.507557 15.248C0.586337 16.0563 1.26347 16.6742 2.07556 16.679H17.9243C18.7365 16.6742 19.4137 16.0563 19.4924 15.248C19.5712 14.4396 19.0261 13.7025 18.2303 13.541ZM14.1381 7.44679L12.9582 8.62786L13.4065 9.07608L15.1549 7.3273C15.5264 6.956 16.1285 6.956 16.4999 7.3273C16.8712 7.69876 16.8712 8.30082 16.4999 8.67228L14.8476 10.3237L15.2956 10.7719L16.3775 9.69006C17.124 10.8287 17.5466 12.1489 17.6007 13.5092H12.7416C13.1641 12.7837 13.2797 11.9194 13.0626 11.1082C12.8454 10.2971 12.3135 9.60602 11.5848 9.1886V6.3866C12.4936 6.58114 13.359 6.94037 14.1381 7.44679ZM8.30129 13.8053C8.2352 13.7453 8.17221 13.6818 8.11278 13.6151C7.58346 13.0259 7.36043 12.2231 7.50963 11.4453C7.65899 10.6675 8.1637 10.0043 8.87349 9.65292C9.58451 9.30716 10.4149 9.30716 11.1259 9.65292C12.0143 10.0912 12.5662 11.0066 12.539 11.9968C12.5117 12.987 11.9104 13.8708 10.9993 14.2596C10.0881 14.6482 9.03414 14.4708 8.30036 13.8053H8.30129ZM9.049 5.58487C9.049 5.05973 9.47478 4.63395 9.99992 4.63395C10.5252 4.63395 10.9508 5.05973 10.9508 5.58487V8.90088C10.3319 8.70602 9.66809 8.70602 9.049 8.90088V5.58487ZM3.62251 9.69006L4.70437 10.7719L5.15244 10.3237L3.50009 8.67135C3.12879 8.2999 3.12879 7.69783 3.50009 7.32638C3.87154 6.95508 4.47361 6.95508 4.84506 7.32638L6.59353 9.07515L7.0416 8.62786L5.86192 7.44787C6.64105 6.94099 7.50638 6.58145 8.41505 6.3866V9.18891C7.68653 9.60633 7.15458 10.2972 6.93744 11.1084C6.72029 11.9194 6.83575 12.7837 7.25843 13.5092H2.39919C2.45336 12.1489 2.87604 10.8287 3.62251 9.69006ZM18.5989 15.7655C18.4199 15.9443 18.1773 16.0447 17.9243 16.045H2.07556C1.55042 16.045 1.12464 15.6194 1.12464 15.0941C1.12464 14.569 1.55042 14.1432 2.07556 14.1432H7.73869C7.76222 14.1673 7.78853 14.1885 7.81283 14.2117C7.84905 14.2466 7.88542 14.2811 7.92318 14.3141C7.9676 14.3527 8.01326 14.389 8.05954 14.425C8.09885 14.4568 8.13739 14.4859 8.17809 14.5145C8.22623 14.5484 8.2756 14.5778 8.32575 14.6095C8.36723 14.6355 8.40809 14.6618 8.45065 14.6857C8.50265 14.7151 8.5562 14.7411 8.60913 14.7674C8.65185 14.7883 8.69411 14.8101 8.73775 14.8308C8.79393 14.8551 8.85166 14.8757 8.90924 14.8971C8.95273 14.9129 8.99514 14.9304 9.03925 14.9443C9.10038 14.9639 9.16322 14.9791 9.22559 14.9946C9.26785 15.0054 9.30902 15.0181 9.35235 15.0263C9.42247 15.0409 9.49382 15.0505 9.56486 15.0602C9.60123 15.0653 9.63667 15.0729 9.6732 15.0768C9.8905 15.1 10.1095 15.1 10.3268 15.0768C10.3636 15.0729 10.3994 15.0653 10.4358 15.0602C10.5065 15.0505 10.5775 15.0409 10.6472 15.0263C10.6904 15.0172 10.7322 15.0045 10.7741 14.9946C10.8374 14.9791 10.8979 14.963 10.9589 14.9449C11.0035 14.9307 11.047 14.9132 11.0908 14.8968C11.1477 14.8757 11.2045 14.8554 11.2599 14.8315C11.3047 14.8121 11.3478 14.7895 11.3915 14.768C11.4441 14.7423 11.4967 14.7169 11.5478 14.6881C11.5911 14.6637 11.6334 14.6368 11.6746 14.6104C11.7233 14.5787 11.7722 14.5493 11.8191 14.5154C11.8606 14.4865 11.9002 14.4555 11.9402 14.4241C11.9858 14.389 12.0305 14.3531 12.0743 14.315C12.1123 14.2834 12.1488 14.2475 12.1855 14.2124C12.2099 14.1888 12.2359 14.1679 12.2598 14.1436H17.9243C18.3089 14.1432 18.6559 14.3744 18.8035 14.7295C18.951 15.0845 18.8704 15.4936 18.5989 15.7658V15.7655Z"/>
    </mask>
    <path d="M18.2303 13.541C18.1814 12.0024 17.6971 10.5091 16.8336 9.23457L16.9481 9.12019C17.3513 8.72041 17.51 8.13537 17.3639 7.5867C17.2176 7.03788 16.789 6.60931 16.2402 6.46305C15.6915 6.31695 15.1065 6.47559 14.7067 6.87877L14.5942 6.99129C13.6843 6.37855 12.6612 5.95354 11.5848 5.7415V5.58487C11.5848 4.70963 10.8753 4 9.99992 4C9.12468 4 8.41505 4.70963 8.41505 5.58487V5.7415C7.33876 5.95339 6.31571 6.37808 5.4058 6.99067L5.29328 6.87815C4.67357 6.26386 3.6739 6.26603 3.05682 6.88311C2.43974 7.50019 2.43757 8.49986 3.05187 9.11957L3.1664 9.23395C2.30292 10.5087 1.81864 12.0022 1.76973 13.541C0.973888 13.7025 0.428778 14.4396 0.507557 15.248C0.586337 16.0563 1.26347 16.6742 2.07556 16.679H17.9243C18.7365 16.6742 19.4137 16.0563 19.4924 15.248C19.5712 14.4396 19.0261 13.7025 18.2303 13.541ZM14.1381 7.44679L12.9582 8.62786L13.4065 9.07608L15.1549 7.3273C15.5264 6.956 16.1285 6.956 16.4999 7.3273C16.8712 7.69876 16.8712 8.30082 16.4999 8.67228L14.8476 10.3237L15.2956 10.7719L16.3775 9.69006C17.124 10.8287 17.5466 12.1489 17.6007 13.5092H12.7416C13.1641 12.7837 13.2797 11.9194 13.0626 11.1082C12.8454 10.2971 12.3135 9.60602 11.5848 9.1886V6.3866C12.4936 6.58114 13.359 6.94037 14.1381 7.44679ZM8.30129 13.8053C8.2352 13.7453 8.17221 13.6818 8.11278 13.6151C7.58346 13.0259 7.36043 12.2231 7.50963 11.4453C7.65899 10.6675 8.1637 10.0043 8.87349 9.65292C9.58451 9.30716 10.4149 9.30716 11.1259 9.65292C12.0143 10.0912 12.5662 11.0066 12.539 11.9968C12.5117 12.987 11.9104 13.8708 10.9993 14.2596C10.0881 14.6482 9.03414 14.4708 8.30036 13.8053H8.30129ZM9.049 5.58487C9.049 5.05973 9.47478 4.63395 9.99992 4.63395C10.5252 4.63395 10.9508 5.05973 10.9508 5.58487V8.90088C10.3319 8.70602 9.66809 8.70602 9.049 8.90088V5.58487ZM3.62251 9.69006L4.70437 10.7719L5.15244 10.3237L3.50009 8.67135C3.12879 8.2999 3.12879 7.69783 3.50009 7.32638C3.87154 6.95508 4.47361 6.95508 4.84506 7.32638L6.59353 9.07515L7.0416 8.62786L5.86192 7.44787C6.64105 6.94099 7.50638 6.58145 8.41505 6.3866V9.18891C7.68653 9.60633 7.15458 10.2972 6.93744 11.1084C6.72029 11.9194 6.83575 12.7837 7.25843 13.5092H2.39919C2.45336 12.1489 2.87604 10.8287 3.62251 9.69006ZM18.5989 15.7655C18.4199 15.9443 18.1773 16.0447 17.9243 16.045H2.07556C1.55042 16.045 1.12464 15.6194 1.12464 15.0941C1.12464 14.569 1.55042 14.1432 2.07556 14.1432H7.73869C7.76222 14.1673 7.78853 14.1885 7.81283 14.2117C7.84905 14.2466 7.88542 14.2811 7.92318 14.3141C7.9676 14.3527 8.01326 14.389 8.05954 14.425C8.09885 14.4568 8.13739 14.4859 8.17809 14.5145C8.22623 14.5484 8.2756 14.5778 8.32575 14.6095C8.36723 14.6355 8.40809 14.6618 8.45065 14.6857C8.50265 14.7151 8.5562 14.7411 8.60913 14.7674C8.65185 14.7883 8.69411 14.8101 8.73775 14.8308C8.79393 14.8551 8.85166 14.8757 8.90924 14.8971C8.95273 14.9129 8.99514 14.9304 9.03925 14.9443C9.10038 14.9639 9.16322 14.9791 9.22559 14.9946C9.26785 15.0054 9.30902 15.0181 9.35235 15.0263C9.42247 15.0409 9.49382 15.0505 9.56486 15.0602C9.60123 15.0653 9.63667 15.0729 9.6732 15.0768C9.8905 15.1 10.1095 15.1 10.3268 15.0768C10.3636 15.0729 10.3994 15.0653 10.4358 15.0602C10.5065 15.0505 10.5775 15.0409 10.6472 15.0263C10.6904 15.0172 10.7322 15.0045 10.7741 14.9946C10.8374 14.9791 10.8979 14.963 10.9589 14.9449C11.0035 14.9307 11.047 14.9132 11.0908 14.8968C11.1477 14.8757 11.2045 14.8554 11.2599 14.8315C11.3047 14.8121 11.3478 14.7895 11.3915 14.768C11.4441 14.7423 11.4967 14.7169 11.5478 14.6881C11.5911 14.6637 11.6334 14.6368 11.6746 14.6104C11.7233 14.5787 11.7722 14.5493 11.8191 14.5154C11.8606 14.4865 11.9002 14.4555 11.9402 14.4241C11.9858 14.389 12.0305 14.3531 12.0743 14.315C12.1123 14.2834 12.1488 14.2475 12.1855 14.2124C12.2099 14.1888 12.2359 14.1679 12.2598 14.1436H17.9243C18.3089 14.1432 18.6559 14.3744 18.8035 14.7295C18.951 15.0845 18.8704 15.4936 18.5989 15.7658V15.7655Z" fill="${color}"/>
    <path d="M18.2303 13.541C18.1814 12.0024 17.6971 10.5091 16.8336 9.23457L16.9481 9.12019C17.3513 8.72041 17.51 8.13537 17.3639 7.5867C17.2176 7.03788 16.789 6.60931 16.2402 6.46305C15.6915 6.31695 15.1065 6.47559 14.7067 6.87877L14.5942 6.99129C13.6843 6.37855 12.6612 5.95354 11.5848 5.7415V5.58487C11.5848 4.70963 10.8753 4 9.99992 4C9.12468 4 8.41505 4.70963 8.41505 5.58487V5.7415C7.33876 5.95339 6.31571 6.37808 5.4058 6.99067L5.29328 6.87815C4.67357 6.26386 3.6739 6.26603 3.05682 6.88311C2.43974 7.50019 2.43757 8.49986 3.05187 9.11957L3.1664 9.23395C2.30292 10.5087 1.81864 12.0022 1.76973 13.541C0.973888 13.7025 0.428778 14.4396 0.507557 15.248C0.586337 16.0563 1.26347 16.6742 2.07556 16.679H17.9243C18.7365 16.6742 19.4137 16.0563 19.4924 15.248C19.5712 14.4396 19.0261 13.7025 18.2303 13.541ZM14.1381 7.44679L12.9582 8.62786L13.4065 9.07608L15.1549 7.3273C15.5264 6.956 16.1285 6.956 16.4999 7.3273C16.8712 7.69876 16.8712 8.30082 16.4999 8.67228L14.8476 10.3237L15.2956 10.7719L16.3775 9.69006C17.124 10.8287 17.5466 12.1489 17.6007 13.5092H12.7416C13.1641 12.7837 13.2797 11.9194 13.0626 11.1082C12.8454 10.2971 12.3135 9.60602 11.5848 9.1886V6.3866C12.4936 6.58114 13.359 6.94037 14.1381 7.44679ZM8.30129 13.8053C8.2352 13.7453 8.17221 13.6818 8.11278 13.6151C7.58346 13.0259 7.36043 12.2231 7.50963 11.4453C7.65899 10.6675 8.1637 10.0043 8.87349 9.65292C9.58451 9.30716 10.4149 9.30716 11.1259 9.65292C12.0143 10.0912 12.5662 11.0066 12.539 11.9968C12.5117 12.987 11.9104 13.8708 10.9993 14.2596C10.0881 14.6482 9.03414 14.4708 8.30036 13.8053H8.30129ZM9.049 5.58487C9.049 5.05973 9.47478 4.63395 9.99992 4.63395C10.5252 4.63395 10.9508 5.05973 10.9508 5.58487V8.90088C10.3319 8.70602 9.66809 8.70602 9.049 8.90088V5.58487ZM3.62251 9.69006L4.70437 10.7719L5.15244 10.3237L3.50009 8.67135C3.12879 8.2999 3.12879 7.69783 3.50009 7.32638C3.87154 6.95508 4.47361 6.95508 4.84506 7.32638L6.59353 9.07515L7.0416 8.62786L5.86192 7.44787C6.64105 6.94099 7.50638 6.58145 8.41505 6.3866V9.18891C7.68653 9.60633 7.15458 10.2972 6.93744 11.1084C6.72029 11.9194 6.83575 12.7837 7.25843 13.5092H2.39919C2.45336 12.1489 2.87604 10.8287 3.62251 9.69006ZM18.5989 15.7655C18.4199 15.9443 18.1773 16.0447 17.9243 16.045H2.07556C1.55042 16.045 1.12464 15.6194 1.12464 15.0941C1.12464 14.569 1.55042 14.1432 2.07556 14.1432H7.73869C7.76222 14.1673 7.78853 14.1885 7.81283 14.2117C7.84905 14.2466 7.88542 14.2811 7.92318 14.3141C7.9676 14.3527 8.01326 14.389 8.05954 14.425C8.09885 14.4568 8.13739 14.4859 8.17809 14.5145C8.22623 14.5484 8.2756 14.5778 8.32575 14.6095C8.36723 14.6355 8.40809 14.6618 8.45065 14.6857C8.50265 14.7151 8.5562 14.7411 8.60913 14.7674C8.65185 14.7883 8.69411 14.8101 8.73775 14.8308C8.79393 14.8551 8.85166 14.8757 8.90924 14.8971C8.95273 14.9129 8.99514 14.9304 9.03925 14.9443C9.10038 14.9639 9.16322 14.9791 9.22559 14.9946C9.26785 15.0054 9.30902 15.0181 9.35235 15.0263C9.42247 15.0409 9.49382 15.0505 9.56486 15.0602C9.60123 15.0653 9.63667 15.0729 9.6732 15.0768C9.8905 15.1 10.1095 15.1 10.3268 15.0768C10.3636 15.0729 10.3994 15.0653 10.4358 15.0602C10.5065 15.0505 10.5775 15.0409 10.6472 15.0263C10.6904 15.0172 10.7322 15.0045 10.7741 14.9946C10.8374 14.9791 10.8979 14.963 10.9589 14.9449C11.0035 14.9307 11.047 14.9132 11.0908 14.8968C11.1477 14.8757 11.2045 14.8554 11.2599 14.8315C11.3047 14.8121 11.3478 14.7895 11.3915 14.768C11.4441 14.7423 11.4967 14.7169 11.5478 14.6881C11.5911 14.6637 11.6334 14.6368 11.6746 14.6104C11.7233 14.5787 11.7722 14.5493 11.8191 14.5154C11.8606 14.4865 11.9002 14.4555 11.9402 14.4241C11.9858 14.389 12.0305 14.3531 12.0743 14.315C12.1123 14.2834 12.1488 14.2475 12.1855 14.2124C12.2099 14.1888 12.2359 14.1679 12.2598 14.1436H17.9243C18.3089 14.1432 18.6559 14.3744 18.8035 14.7295C18.951 15.0845 18.8704 15.4936 18.5989 15.7658V15.7655Z" stroke="${color}" stroke-width="0.5" mask="url(#path-1-outside-1)"/>
    </svg>
  `;

  return <SvgXml xml={icon} width="100%" height="100%" />;
};

export default IconAuthor;
