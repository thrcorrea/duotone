const applyEffect = (image, options) => {
  return new Promise((resolve, reject) => {
      const ignoreKeys = ["image"];
      Object.keys(options).map(key => {
          if (ignoreKeys.indexOf(key) == -1) {
              typeof options[key] == "boolean" ?
                  image[key]() :
                  image[key](options[key]);
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
