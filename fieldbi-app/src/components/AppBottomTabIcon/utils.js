const decToHex = dec => (+dec).toString(16).padStart(2, '0');

const alphaToHex = alpha => {
  if (alpha) {
    return decToHex(alpha * 256);
  }

  return '';
};

export const transformRgbaToHex = color => {
  if (/^rgb/.test(color)) {
    color = color.replace(/[a-z]|\)|\(/g, '');

    const [r, g, b, a] = color.trim().split(',');

    return `#${decToHex(r)}${decToHex(g)}${decToHex(b)}${alphaToHex(a)}`;
  }

  return color;
};
