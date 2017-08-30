const api = require('./api.js');

const getImageFromUrl = image => api.getImageFromUrl(image);

const sanitizeInputs = (options) => {
    for (var props in options) {
        if (options.hasOwnProperty(props)) {
            options[props] = ColorHelper.removeHash(options[props]);
        }
    }
    return options;
};

module.exports = {
    getImageFromUrl,
    sanitizeInputs,
}