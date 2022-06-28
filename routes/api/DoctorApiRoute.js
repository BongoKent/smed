const express = require('express');
const router = express.Router();


const docApiController = require('../../api/DoctorAPI');

router.get('/',docApiController.getDoctors);
router.get('/:idDoc',docApiController.getDoctorById);
router.post('/',docApiController.addDoctor);
router.put('/:idDoc',docApiController.updateDoctor);
router.delete('/:idDoc',docApiController.deleteDoctor);
module.exports = router ;