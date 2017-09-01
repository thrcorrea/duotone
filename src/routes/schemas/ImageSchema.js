const Joi = require('joi');
const RouteValidator = require('../../middlewares/RouteValidator');

class ImageSchema extends RouteValidator {

  static get get() {
    const schema = {
      query: Joi.object().keys({
        image: Joi.string().required(),
        color: Joi.string(),
        grayscale: Joi.boolean(),
        blur: Joi.number().integer(),
      }),
    };

    return this.validate(schema);
  }

  static get post() {
    const schema = {
      body: Joi.object().keys({
        image: Joi.string().required(),
        color: Joi.string(),
        grayscale: Joi.boolean(),
        blur: Joi.number().integer(),
      }),
    };

    return this.validate(schema);
  }

}

module.exports = ImageSchema;