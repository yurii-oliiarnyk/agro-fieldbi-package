// Copy from: https://github.com/Sitebase/react-avatar/blob/1d6d7b2f6f6df70b3c4ebf61a5cf127ca2f2ac59/src/utils.js#L43

const defaultColors = [
  '#d73d32',
  '#7e3794',
  '#4285f4',
  '#67ae3f',
  '#d61a7f',
  '#ff4080',
  '#5E005E',
  '#AB2F52',
  '#E55D4A',
  '#4194A6',
  '#FFCC6B'
];

// https://en.wikipedia.org/wiki/Linear_congruential_generator
const stringAsciiPRNG = (value, m) => {
  // Xn+1 = (a * Xn + c) % m
  // 0 < a < m
  // 0 <= c < m
  // 0 <= X0 < m

  const charCodes = [...value].map(letter => letter.charCodeAt(0));
  const len = charCodes.length;

  const a = (len % (m - 1)) + 1;
  const c = charCodes.reduce((current, next) => current + next) % m;

  let random = charCodes[0] % m;
  for (let i = 0; i < len; i++) random = (a * random + c) % m;

  return random;
};

export const getRandomColor = (value, colors = defaultColors) => {
  // if no value is passed, always return transparent color otherwise
  // a rerender would show a new color which would will
  // give strange effects when an interface is loading
  // and gets rerendered a few consequent times
  if (!value) return colors[0];

  // value based random color index
  // the reason we don't just use a random number is to make sure that
  // a certain value will always get the same color assigned given
  // a fixed set of colors
  const colorIndex = stringAsciiPRNG(value, colors.length);
  return colors[colorIndex];
};

export const getInitials = (value = '') => {
  const initials = value
    .split(' ')
    .map(word => word[0])
    .join('');

  return (initials[0] || '') + (initials[1] || '');
};

export const getAvatarSize = value => {
  switch (value) {
    case 'small':
      return 24;

    case 'medium':
      return 32;

    case 'large':
      return 48;

    default:
      return value;
  }
};
