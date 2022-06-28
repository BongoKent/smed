const express = require('express');

const router = express.Router();

const docController = require('../controllers/docController');

router.get('/',docController.showDocList);

router.get('/add',docController.showDocForm);

router.get('/details/:IdDoctor',docController.showDocDetails);

router.get('/edit/:IdDoctor',docController.showDocEdit);

router.post('/add',docController.addDoctor);

router.post('/edit',docController.updateDoctor);

router.get('/delete/:IdDoctor',docController.deleteDoctor);

router.get('/succes',docController.showSucces);

router.get('/editAdmin/:IdDoctor',docController.showDocAdmin);

router.post('/editAdmin',docController.updateDoctorAdmin);

module.exports = router;

