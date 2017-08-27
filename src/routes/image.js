const express = require('express');
const duotoneController = require('../controllers/image.js');

const router = express.Router();

router.get('/', duotoneController.duotoneImage);

router.post('/', duotoneController.duotoneImage);

module.exports = router;