const api = require('./api.js');

function duotoneImage(image) {
    console.log(image);
    return api.get(image);
}

module.exports = {
    duotoneImage
}