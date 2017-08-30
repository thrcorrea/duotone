const Jimp = require('jimp');

const ImageService = require('../services/image.js');
const DuotoneEffect = require('../services/effects/duotone');
const GeneralEffect = require('../services/effects/general');

const sanitizeInputs = (req, res, next) => {
    req.options = ImageService.sanitizeInputs(req.options);
    return next();
}

const selectEffect = (effect) => {
    return (image, options) => {
        switch (effect) {
            case 'duotone':
                return DuotoneEffect.applyEffect(image, options);
            default:
                return GeneralEffect.applyEffect(image, options);
        };
    }
};

const processImage = (req, res) => {
    const effect = req.params.effect;
    const options = req.body.options || req.query;
    const imageUrl = req.body.image || req.query.image;

    return ImageService.getImageFromUrl(imageUrl)
        .then(result => Jimp.read(result))
        .then(image => selectEffect(effect)(image, options))
        .then(({ buffer, image }) => {
            res.set("Content-Type", image.getMIME());
            res.send(buffer);
        })
        .catch((err) => {
            throw err;
            res.send({ success: false, err });
        });
}


module.exports = {
    processImage,
    sanitizeInputs
}