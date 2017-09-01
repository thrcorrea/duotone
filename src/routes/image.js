const express = require('express');
const ImageController = require('../controllers/image.js');
const ImageSchema = require('../routes/schemas/ImageSchema');

const router = express.Router();

router.get('/:effect?', ImageSchema.get, ImageController.sanitizeInputs, ImageController.processImage);

router.post('/:effect?', ImageSchema.post, ImageController.sanitizeInputs, ImageController.processImage);

module.exports = router;