const api = require('./api.js');
const ColorHelper = require('../helpers/color');

const getImageFromUrl = image => api.getImageFromUrl(image);

const sanitizeInputs = (options) => {
    for (var props in options) {
        options[props] = isNaN(parseInt(options[props], 10)) || (/(?:[0-9a-fA-F]{3}){1,2}$/).test(options[props]) ?
            options[props] :
            parseInt(options[props], 10);
    }
    return options;
};

module.exports = {
    getImageFromUrl,
    sanitizeInputs,
}