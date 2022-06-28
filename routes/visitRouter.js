const express = require('express');

const router = express.Router();

const visitController = require('../controllers/visitController');
    
router.get('/',visitController.showVisitList);

router.get('/add',visitController.showAddVisitForm);

router.get('/delete/:IdVisit',visitController.deleteVisit);

router.get('/edit/:IdVisit',visitController.showEditVisitForm);

router.post('/add',visitController.addVisit);

router.get('/succes',visitController.showSucces);

router.post('/edit',visitController.updateVisit);

module.exports = router;
