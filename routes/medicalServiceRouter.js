const express = require('express');

const router = express.Router();

const medicalServiceController = require('../controllers/medicalServiceController');

router.get('/',medicalServiceController.showMedicalServiceList);

router.get('/sortedByName',medicalServiceController.showMedicalServiceListSortName);

router.get('/sortedByPrice',medicalServiceController.showMedicalServiceListSortPrice);

router.get('/sortedByPriceDesc',medicalServiceController.showMedicalServiceListSortPriceDesc);

router.post('/',medicalServiceController.updatePrices);

router.get('/add',medicalServiceController.showMedicalServiceForm);

router.post('/add',medicalServiceController.addMedicalService);

router.get('/succes',medicalServiceController.showMedicalServiceListSucces);

router.get('/delete/:IdMedicalService',medicalServiceController.deleteMedicalService);

module.exports = router;

