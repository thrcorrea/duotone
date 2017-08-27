const duotoneService = require('../services/image.js');
const Jimp = require('jimp');

/* {
    grayscale: true,
    blur: 5
} */

function transformImage(image, options) {
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
    })
}

function resolveContentType(imageUrl) {

}

function duotoneImage(req, res) {
    return duotoneService.duotoneImage(req.body.image)
        .then((result) => Jimp.read(result))
        .then((image) => transformImage(image, req.body))
        .then(({ buffer, image }) => {
            res.set("Content-Type", image.getMIME());
            res.send(buffer);
        })
        .catch((err) => {
            res.send({ success: false, err });
        });
}

module.exports = {
    duotoneImage
}