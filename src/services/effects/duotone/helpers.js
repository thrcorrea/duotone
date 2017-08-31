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
  switch (colorName) {
    case 'grey':
    case 'gray':
      return { primaryColor: '#FBFBFB', secondaryColor: '#283B6B' };
    case 'yellow':
      return { primaryColor: '#FCC862', secondaryColor: '#2D45C6' };
    case 'green':
      return { primaryColor: '#71DF6F', secondaryColor: '#272D67' };
    case 'red':
      return { primaryColor: '#D92037', secondaryColor: '#2A3060' };
    case 'purple':
      return { primaryColor: '#8ADFD0', secondaryColor: '#5C2998' };
    case 'sand':
      return { primaryColor: '#FCC862', secondaryColor: '#2D45C6' };
    case 'tomato':
      return { primaryColor: '#A3D5CA', secondaryColor: '#E52839' };
    default:
      return { primaryColor: '#8ADFD0', secondaryColor: '#5C2998' };
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
