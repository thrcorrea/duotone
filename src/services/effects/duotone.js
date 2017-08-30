const Jimp = require('jimp');
const ColorHelper = require('../../helpers/color');

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

const transformColor = (color) => {
  return (color instanceof Array) ?
    color :
    ColorHelper.hexToRgb(color);
};

const applyEffect = (image, { primaryColor, secondaryColor }) => {
  return new Promise((resolve, reject) => {
    try {
        if (!primaryColor || !secondaryColor) return reject('Missing Parameters');

        const firstColor = transformColor(primaryColor);
        const secondColor = transformColor(secondaryColor);
        const gradient = createGradient(firstColor, secondColor);

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            let red   = this.bitmap.data[ idx + 0 ];
            let green = this.bitmap.data[ idx + 1 ];
            let blue  = this.bitmap.data[ idx + 2 ];
            let alpha = this.bitmap.data[ idx + 3 ];

            const avg = Math.round(0.2126 * red + 0.7152 * green + 0.0722 * blue);

            red = gradient[avg][0];
            green = gradient[avg][1];
            blue = gradient[avg][2];

            image.setPixelColor(Jimp.rgbaToInt(red, green, blue, alpha), x, y);

        });
        image.getBuffer(image.getMIME(), (err, buffer) => {
            if (err) return reject(err);
            return resolve( { buffer, image });
        });
    } catch(err) {
        return reject(err);
    }
  })
};

module.exports = {
  applyEffect,
};
