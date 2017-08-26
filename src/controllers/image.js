const duotoneService = require('../services/image.js');
const Jimp = require('jimp');

function duotoneImage(req, res) {
    return duotoneService.duotoneImage(req.query.image)
        .then((result) => Jimp.read(result))
        .then((image) => {
            image
                .grayscale()
                .blur(Number(req.query.blur))
                .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
                    res.set("Content-Type", Jimp.MIME_JPEG);
                    res.send(buffer);
                });
        })
        .catch((err) => {
            res.send({ success: false, err });
        });
}

module.exports = {
    duotoneImage
}