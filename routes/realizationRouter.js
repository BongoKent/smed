const express = require('express');

const router = express.Router();

const realizationController = require('../controllers/realizationController');

router.get('/',realizationController.showRealizationList);

//router.post('/',realizationController.updatePrices);

module.exports = router;
