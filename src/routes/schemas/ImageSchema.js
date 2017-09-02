const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

const keys = {
  /* Image */
  image: Joi.string().required(),
  
  /* Colour */
  color: Joi.string(),
  brightness: Joi.number().min(-1).max(1),     // image.brightness( val );    // adjust the brighness by a value -1 to +1
  contrast: Joi.number().min(-1).max(1),       // image.contrast( val );      // adjust the contrast by a value -1 to +1
  dither565: Joi.boolean(),                    // image.dither565();          // ordered dithering of the image and reduce color space to 16-bits (RGB565)
  greyscale: Joi.boolean(),                    // image.greyscale();          // remove colour from the image
  invert: Joi.boolean(),                       // image.invert();             // invert the image colours
  normalize: Joi.boolean(),                    // image.normalize();          // normalize the channels in an image

  /* Alpha channel */
  fade: Joi.number().min(0).max(1),           // image.fade( f );            // an alternative to opacity, fades the image by a factor 0 - 1. 0 will haven no effect. 1 will turn the image
  opacity: Joi.number().min(-1).max(1),        // image.opacity( f );         // multiply the alpha channel by each pixel by the factor f, 0 - 1
  opaque: Joi.boolean(),                       // image.opaque();             // set the alpha channel on every pixel to fully opaque
  background: Joi.string(),                    // image.background( hex );    // set the default new pixel colour (e.g. 0xFFFFFFFF or 0x00000000) for by some operations (e.g. image.contain and

  /* Blurs */
  gaussian: Joi.number().integer().min(0),     // image.gaussian( r );        // Gaussian blur the image by r pixels (VERY slow)
  blur: Joi.number().integer().min(0),         // image.blur( r );            // fast blur the image by r pixels

  /* Effects */
  posterize: Joi.number().integer().min(0),    // image.posterize( n );       // apply a posterization effect with n level
  sepia: Joi.boolean(),                        // image.sepia();              // apply a sepia wash to the image
  pixelate: Joi.number(),                      // image.pixelate( size[, x, y, w, h ]);  // apply a pixelation effect to the image or a region

  /* 3D */
  //image.displace( map, offset );    // displaces the image pixels based on the provided displacement map. Useful for making stereoscopic 3D images.

  /* Resize */
  resize: Joi.string(),
};

class ImageSchema extends RouteValidator {

  static get get() {
    const schema = {
      query: Joi.object().keys(keys),
    };

    return this.validate(schema);
  }

  static get post() {
    const schema = {
      body: Joi.object().keys(keys),
    };

    return this.validate(schema);
  }

}

module.exports = ImageSchema;