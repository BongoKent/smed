const express = require('express');

const router = express.Router();

const patientController = require('../controllers/patientController');

router.get('/',patientController.showPatientList);

router.get('/add',patientController.showPatientForm);

router.get('/edit/:IdPatient',patientController.showPatientEdit);

router.post('/add',patientController.addPatient);

router.post('/edit',patientController.updatePatient);

router.get('/delete/:IdPatient',patientController.deletePatient);

router.get('/succes',patientController.showSucces);

module.exports = router;
