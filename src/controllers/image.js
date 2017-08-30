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

function crazyDuotone(image) {
    return new Promise((resolve, reject) => {
        try {
            console.log(image.bitmap.width);
            console.log(image.bitmap.height);

            const secondColor = [236, 45, 45];
            const firstColor = [45, 236, 153];
            const gradienteLoco = makeDuoTone(firstColor, secondColor)
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                let red   = this.bitmap.data[ idx + 0 ];
                let green = this.bitmap.data[ idx + 1 ];
                let blue  = this.bitmap.data[ idx + 2 ];
                let alpha = this.bitmap.data[ idx + 3 ];
    
                const avg = Math.round(0.2126 * red + 0.7152 * green + 0.0722 * blue);
    
                const firstColor = [236, 45, 45];
                const secondColor = [45, 236, 153];
    
                red = gradienteLoco[avg][0];
                green = gradienteLoco[avg][1];
                blue = gradienteLoco[avg][2];
    
                // console.log(test);
    
                // console.log(red);
    
                image.setPixelColor(Jimp.rgbaToInt(red, green, blue, alpha), x, y);
    
            });
            image.getBuffer(image.getMIME(), (err, buffer) => {
                if (err) return reject(err);
                return resolve( { buffer, image });
            });
        } catch(err) {
            return reject(err);
        }
        
    })
}

function resolveContentType(imageUrl) {

}

function makeDuoTone(primaryColorRGB, secondaryColorRGB) {
    let duotoneGradient = [];
    for (let i = 0; i < 256; i++) {
        const ratio = i / 255;
        console.log(ratio);
        let modifiedArray = [
            Math.round(primaryColorRGB[0] * ratio + secondaryColorRGB[0] * (1 - ratio)),
            Math.round(primaryColorRGB[1] * ratio + secondaryColorRGB[1] * (1 - ratio)),
            Math.round(primaryColorRGB[2] * ratio + secondaryColorRGB[2] * (1 - ratio))
        ];
        console.log(modifiedArray);
        duotoneGradient.push(modifiedArray);
    }

    console.log(duotoneGradient);

    return duotoneGradient;
}

function duotoneImage(req, res) {
    return duotoneService.duotoneImage(req.body.image)
        .then((result) => Jimp.read(result))
        .then((image) => crazyDuotone(image))
        // .then((result) => transformImage(result, req.body))
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
    duotoneImage
}