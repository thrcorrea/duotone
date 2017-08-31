const Jimp = require('jimp');
const EffectHelper = require('./helpers');

const applyEffect = (image, options) => {
  return new Promise((resolve, reject) => {
    try {
        const { primaryColor, secondaryColor } = EffectHelper.parseOptions(options);
        if (!primaryColor || !secondaryColor) return reject('Missing Parameters');

        const firstColor = EffectHelper.transformColor(primaryColor);
        const secondColor = EffectHelper.transformColor(secondaryColor);
        const gradient = EffectHelper.createGradient(firstColor, secondColor);

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
