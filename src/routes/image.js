const express = require('express');
const ImageController = require('../controllers/image.js');

const router = express.Router();

router.get('/:effect?', ImageController.sanitizeInputs, ImageController.processImage);

router.post('/:effect?', ImageController.sanitizeInputs, ImageController.processImage);

module.exports = router;