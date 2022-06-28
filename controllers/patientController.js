const PatientRepository = require('../repository/PatientRepository');


exports.showPatientList = (req,res,next) => {
    PatientRepository.getPatients()
        .then(patients =>{
            res.render('pages/patients/patientList',{
                patients: patients,
                navLocation: 'pat'
            });
        });

}   

exports.showPatientForm = (req,res,next) => {
    res.render('pages/patients/patientForm',{
        
        patient: {},
        pageTitle: req.__('pat.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('pat.form.addNew'),
        formAction: '/patients/add',
        navLocation: 'pat',
        validationErrors: []

    });
    
    
}

exports.showPatientEdit = (req,res,next) => {
    const IdPatient = req.params.IdPatient;
    PatientRepository.getPatientById(IdPatient)
        .then(patient => {
            res.render('pages/patients/patientForm',
            {
                patient: patient,
                formMode: 'edit',
                pageTitle: req.__('pat.form.edit.pageTitle'),
                btnLabel: req.__('pat.form.editing'),
                formAction: '/patients/edit',
                navLocation: 'pat',
                validationErrors: []

            });
        });
    
    
}

exports.addPatient = (req,res,next) => {
    const patientData = { ...req.body };
    PatientRepository.addPatient(patientData)
        .then(result => {
            res.redirect('succes');
        }).catch(err => {
            err.details.forEach(e =>{
                e.message=req.__(e.message);
            })  
            res.render('pages/patients/patientForm', {
            patient: patientData,
            pageTitle: req.__('pat.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('pat.form.addNew'),
            formAction: '/patients/add',
            navLocation: 'pat',
            validationErrors: err.details
            });
        
        

        });
    }




    

exports.updatePatient = (req,res,next) => {
const IdPatient2 = req.body.IdPatient;
    const patientData = { ...req.body };

    PatientRepository.updatePatient(IdPatient2,patientData)
       .then(result => {
            res.redirect('succes');
        }).catch(err => {
            err.details.forEach(e =>{
                e.message=req.__(e.message);
            })  
            res.render('pages/patients/patientForm', {
            IdPatient: IdPatient2,
            patient: patientData,
            pageTitle: req.__('pat.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('pat.form.editing'),
            formAction: '/patients/add',
            navLocation: 'pat',
            validationErrors: err.details
            });
        
        

        });
    }

exports.deletePatient = (req,res,next) => {
    const IdPatient2 = req.params.IdPatient;
    PatientRepository.deletePatient(IdPatient2)
        .then( () => {
            res.redirect('/patients');
        });
}
    



exports.showSucces = (req,res,next) => {
    PatientRepository.getPatients()
        .then(patients =>{
            res.render('pages/patients/succesPatient',{
                patients: patients,
                navLocation: 'pat'
            });
        });

}   