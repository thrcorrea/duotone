const ColorHelper = require('../../../helpers/color');

const createGradient = (primaryColorRGB, secondaryColorRGB) => {
  const duotoneGradient = [];
  for (let i = 0; i < 256; i++) {
      const ratio = i / 255;
      const modifiedArray = [
          Math.round(primaryColorRGB[0] * ratio + secondaryColorRGB[0] * (1 - ratio)),
          Math.round(primaryColorRGB[1] * ratio + secondaryColorRGB[1] * (1 - ratio)),
          Math.round(primaryColorRGB[2] * ratio + secondaryColorRGB[2] * (1 - ratio))
      ];
      duotoneGradient.push(modifiedArray);
  }
  return duotoneGradient;
};

const parseOptions = (options) => {
  let primaryColor;
  let secondaryColor;
  if (options.primaryColor && options.secondaryColor) {
    primaryColor = options.primaryColor;
    secondaryColor = options.secondaryColor;
  } else if (options.color) {
    const { color } = options;
    primaryColor = selectColor(color).primaryColor;
    secondaryColor = selectColor(color).secondaryColor;
  } else {
    primaryColor = selectColor().primaryColor;
    secondaryColor = selectColor().secondaryColor;
  }

  return {
    primaryColor, secondaryColor,
  };
};

const selectColor = (colorName) => {
  const colors = [
    { primaryColor: '#FBFBFB', secondaryColor: '#283B6B' },
    { primaryColor: '#FCC862', secondaryColor: '#2D45C6' },
    { primaryColor: '#71DF6F', secondaryColor: '#272D67' },
    { primaryColor: '#D92037', secondaryColor: '#2A3060' },
    { primaryColor: '#8ADFD0', secondaryColor: '#5C2998' },
    { primaryColor: '#FCC862', secondaryColor: '#2D45C6' },
    { primaryColor: '#A3D5CA', secondaryColor: '#E52839' },
    { primaryColor: '#c1fce6', secondaryColor: '#920946' },
    { primaryColor: '#71dd4c', secondaryColor: '#1807b5' },
    { primaryColor: '#ff0de5', secondaryColor: '#15008d' },
    { primaryColor: '#fbd439', secondaryColor: '#15008d' },
    { primaryColor: '#05d1ea', secondaryColor: '#96057c' },
  ];
  switch (colorName) {
    case 'grey':
    case 'gray':
      return colors[0];
    case 'yellow':
      return colors[1];
    case 'green':
      return colors[2];
    case 'red':
      return colors[3];
    case 'purple':
      return colors[4];
    case 'sand':
      return colors[5];
    case 'tomato':
      return colors[6];
    case 'rusty':
      return colors[7];
    case 'lime':
      return colors[8];
    case 'neon':
      return colors[9];
    case 'bubblebee':
      return colors[10];
    case 'blurple':
      return colors[11];
    default:
      return colors[Math.floor(Math.random() * colors.length)];
  }
};

const transformColor = (color) => {
  return (color instanceof Array) ?
    color :
    ColorHelper.hexToRgb(color);
};

module.exports = {
  createGradient,
  parseOptions,
  selectColor,
  transformColor,
};
