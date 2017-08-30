const Jimp = require('jimp');

const ImageService = require('../services/image.js');
const DuotoneEffect = require('../services/effects/duotone');
const GeneralEffect = require('../services/effects/general');

const sanitizeInputs = (req, res, next) => {
    const options = req.body.options || req.query;
    req.options = ImageService.sanitizeInputs(options);

    return next();
}

const selectEffect = (effect) => {
    return (image, options) => {
        switch (effect) {
            case 'duotone':
                return DuotoneEffect.applyEffect(image, options);
            case 'general':
                return GeneralEffect.applyEffect(image, options);
            default:
                return null;
        };
    }
};

const processImage = (req, res) => {
    const effect = req.params.effect || 'general';
    const options = req.options;
    const imageUrl = req.body.image || req.query.image;

    return ImageService.getImageFromUrl(imageUrl)
        .then(result => Jimp.read(result))
        .then(image => selectEffect(effect)(image, options))
        .then(({ buffer, image }) => {
            res.set("Content-Type", image.getMIME());
            return res.send(buffer);
        })
        .catch((err) => {
            console.log(err);
            return res.send({ success: false, err: (err.message || err) });
        });
}


module.exports = {
    processImage,
    sanitizeInputs
}