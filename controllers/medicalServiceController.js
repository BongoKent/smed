const MedicalServiceRepository = require('../repository/MedicalServiceRepository');


exports.showMedicalServiceList = (req,res,next) => {
    MedicalServiceRepository.getmedicalService()
        .then(meds =>{
            res.render('pages/medicalServices/medicalServiceList',{
                meds: meds,
                navLocation: 'med',
                formMode: 'edit',
                btnLabel: req.__('med.podwyzkaa'),
                formAction: '/medicalService',
                validationErrors: []

            });
        });

}   

exports.showMedicalServiceListSucces = (req,res,next) => {
    MedicalServiceRepository.getmedicalService()
        .then(meds =>{
            res.render('pages/medicalServices/medicalServiceListSucces',{
                meds: meds,
                navLocation: 'med',
                btnLabel: req.__('med.podwyzkaa'),
                formAction: '/medicalService',
                validationErrors: []

            });
        });

}   

exports.showMedicalServiceListSortName = (req,res,next) => {
    MedicalServiceRepository.getmedicalServiceSortAlfa()
        .then(meds =>{
            res.render('pages/medicalServices/medicalServiceList',{
                meds: meds,
                navLocation: 'med',
                btnLabel: req.__('med.podwyzkaa'),
                formAction: '/medicalService',
                validationErrors: []

            });
        });

} 

exports.showMedicalServiceListSortPrice = (req,res,next) => {
    MedicalServiceRepository.getmedicalServiceSortPrice()
        .then(meds =>{
            res.render('pages/medicalServices/medicalServiceList',{
                meds: meds,
                navLocation: 'med',
                btnLabel: req.__('med.podwyzkaa'),
                formAction: '/medicalService',
                validationErrors: []

            });
        });

} 

exports.showMedicalServiceListSortPriceDesc = (req,res,next) => {
    MedicalServiceRepository.getmedicalServiceSortPricedesc()
        .then(meds =>{
            res.render('pages/medicalServices/medicalServiceList',{
                meds: meds,
                navLocation: 'med',
                btnLabel: req.__('med.podwyzkaa'),
                formAction: '/medicalService',
                validationErrors: []

            });
        });

}


exports.updatePrices = (req,res,next) => {
        const Change = req.body.Change;
        const meds = res.meds;
        console.log("WYSPIUJE")
        console.log(meds)
        MedicalServiceRepository.updatePrices(Change)
            .then(result => {
                res.redirect('/medicalService');
            }).catch(err => {
                
                res.render('pages/medicalServices/medicalServiceList', {
                meds: meds,
                Change: Change,
                formMode: 'edit',
                btnLabel: req.__('med.podwyzkaa'),
                formAction: '/medicalService',
                navLocation: 'med',
                validationErrors: err.details
                });
            });
            
    
    };

    exports.updatePrices2 = (req,res,next) => {
        const Change = req.body.Change;
        const meds = res.meds;
        console.log("WYSPIUJE")
        console.log(meds)
        MedicalServiceRepository.updatePrices2(Change)
            .then(result => {
                res.redirect('/medicalService');
            }).catch(err => {
                res.render('pages/medicalServices/medicalServiceList', {
                meds: meds,
                Change: Change,
                formMode: 'edit2',
                btnLabel: req.__('med.podwyzkaa'),
                formAction: '/medicalService',
                navLocation: 'med',
                validationErrors: err.details
                });
            });
            
    
    };


    exports.showMedicalServiceForm = (req,res,next) => {
        res.render('pages/medicalServices/medicalServiceForm',{
            
            medicalService: {},
            pageTitle: req.__('med.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('med.form.addNew'),
            formAction: '/medicalService/add',
            navLocation: 'med',
            validationErrors: []
    
        });
        
        
    }

    exports.addMedicalService = (req,res,next) => {
        const MedicalServiceData = { ...req.body };
        MedicalServiceRepository.addMedicalService(MedicalServiceData)
            .then(result => {
                res.redirect('succes');
            }).catch(err => {
                err.details.forEach(e =>{
                    e.message=req.__(e.message);
                })  
                res.render('pages/MedicalServices/MedicalServiceForm', {
                medicalService: MedicalServiceData,
                pageTitle: req.__('med.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('med.form.addNew'),
                formAction: '/medicalService/add',
                navLocation: 'med',
                validationErrors: err.details
                });
            
            
    
            });
        }


        exports.deleteMedicalService = (req,res,next) => {
            const IdMedicalService = req.params.IdMedicalService;
            console.log(IdMedicalService);
            MedicalServiceRepository.deleteMedicalService(IdMedicalService)
                .then( () => {
                    res.redirect('/medicalService');
                });
        }
            