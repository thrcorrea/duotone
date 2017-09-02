const ColorHelper = require('../../../helpers/color');

const applyEffect = (image, options) => {
  return new Promise((resolve, reject) => {
      const ignoreKeys = ["image"];
      Object.keys(options).map(key => {
          // if (key == 'resize') options[key] = options[key].split(' ');
          console.log(key, options[key], typeof options[key]);
          if (ignoreKeys.indexOf(key) == -1) {
            if (options[key] === "true") {
                image[key]();
            } else if (options[key] instanceof Array) {
                image[key](options[key][0], options[key][1]);
            } else {
                image[key](options[key]);
            }
          }
      });
      image.getBuffer(image.getMIME(), (err, buffer) => {
          if (err) return reject(err);
          return resolve( { buffer, image });
      });
  });
}

module.exports = {
  applyEffect,
};
