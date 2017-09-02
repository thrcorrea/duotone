const api = require('./api.js');
const ColorHelper = require('../helpers/color');

const getImageFromUrl = image => api.getImageFromUrl(image);

const sanitizeInputs = (options) => {
    for (var props in options) {
        if (options[props].indexOf('[') !== -1) {
            const rx = /(\[.*\])/g;
            options[props] = options[props]
                .match(rx)[0]
                .replace(/\[|\]/, '')
                .replace(']', '')
                .replace(/\s/, '')
                .split(',')
                .filter(v => v)
                .map(v => Number(v));
        } else {
            options[props] = isNaN(parseFloat(options[props], 10)) || (/(?:[0-9a-fA-F]{3}){1,2}$/).test(options[props]) ?
                options[props] :
                parseFloat(options[props], 10);
        }
    }
    return options;
};

module.exports = {
    getImageFromUrl,
    sanitizeInputs,
}