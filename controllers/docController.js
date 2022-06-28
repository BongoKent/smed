const DoctorRepository = require('../repository/DoctorsRepository');


exports.showDocList = (req,res,next) => {
    DoctorRepository.getDoctors()
        .then(docs =>{
            res.render('pages/doctors/doc_list',{
                docs: docs,
                navLocation: 'doc'
            });
        });

}   

exports.showDocForm = (req,res,next) => {
    res.render('pages/doctors/doc_add',{
        
        doc: {},
        pageTitle: req.__('doc.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('form.addNew'),
        formAction: '/doctors/add',
        navLocation: 'doc',
        validationErrors: []

    });
    
    
}



exports.showDocAdmin = (req,res,next) => {
    const IdDoctor = req.params.IdDoctor;
    console.log(IdDoctor);
    DoctorRepository.getDocotorById(IdDoctor)
        .then(doc => {
            res.render('pages/doctors/docAdminEdit',
            {
                doc: doc,
                formMode: 'edit',
                pageTitle: req.__('doc.form.edit.pageTitle'),
                btnLabel: req.__('form.edit'),
                formAction: '/doctors/editAdmin',
                navLocation: 'doc',
                validationErrors: []
            });
        });
    
    
}

exports.updateDoctorAdmin = (req,res,next) => {
    const IdDoctor = req.body.IdDoctor;
        const docData = { ...req.body };
        DoctorRepository.updateDoctorAdmin(IdDoctor,docData)
            .then(result => {
                res.redirect('succes');
            }).catch(err => {
                err.details.forEach(e =>{
                    e.message=req.__(e.message);
                })  
                console.log(err.message)
                res.render('pages/doctors/docAdminEdit', {
                IdDoctor: IdDoctor,
                doc: docData,
                formMode: 'edit',
                pageTitle: 'Edytuj lekarza',
                btnLabel: req.__('form.editDoc'),
                formAction: '/doctors/editAdmin',
                navLocation: 'doc',
                validationErrors: err.details
                });
            });
    
    
    };

exports.showDocEdit = (req,res,next) => {
    const IdDoctor = req.params.IdDoctor;
    console.log(IdDoctor);
    DoctorRepository.getDocotorById(IdDoctor)
        .then(doc => {
            res.render('pages/doctors/doc_add',
            {
                doc: doc,
                formMode: 'edit',
                pageTitle: req.__('doc.form.edit.pageTitle'),
                btnLabel: req.__('form.edit'),
                formAction: '/doctors/edit',
                navLocation: 'doc',
                validationErrors: []
            });
        });
    
    
}
exports.showDocDetails = (req,res,next) => {
    const IdDoctor = req.params.IdDoctor;
    DoctorRepository.getDocotorById(IdDoctor)
        .then(doc =>{
            res.render('pages/doctors/doc_add',{
                doc: doc,
                formMode: 'showDetails',
                pageTitle: req.__('doc.form.details.pageTitle'),
                formAction: '',
                navLocation: 'doc',
                validationErrors: []
            });
        });

}

exports.addDoctor = (req,res,next) => {
    const docData = { ...req.body };
    console.log(docData);
    DoctorRepository.addDoctor(docData)
        .then(result => {
            res.redirect('succes');
        }).catch(errors => { 
            errors.details.forEach(e =>{
                e.message=req.__(e.message);
            })  
            res.render('pages/doctors/doc_add', {
            doc: docData,
            pageTitle: req.__('doc.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('doc.form.addNew'),
            formAction: '/doctors/add',
            navLocation: 'doc',
            validationErrors: errors.details
            });
        }); 

};

exports.updateDoctor = (req,res,next) => {
const IdDoctor = req.body.IdDoctor;
    const docData = { ...req.body };
    DoctorRepository.updateDoctor(IdDoctor,docData)
        .then(result => {
            res.redirect('succes');
        }).catch(err => {
            err.details.forEach(e =>{
                e.message=req.__(e.message);
            })  
            res.render('pages/doctors/doc_add', {
            IdDoctor: IdDoctor,
            doc: docData,
            formMode: 'edit',
            pageTitle: req.__('doc.form.edit.pageTitle'),
            btnLabel: req.__('form.editDoc'),
            formAction: '/doctors/edit',
            navLocation: 'doc',
            validationErrors: err.details
            });
        });


};

exports.deleteDoctor = (req,res,next) => {
    const IdDoctor = req.params.IdDoctor;
    console.log(IdDoctor);
    DoctorRepository.deleteDoctor(IdDoctor)
        .then( () => {
            res.redirect('/doctors');
        });
}
    

exports.showSucces2 = (req,res,next)=>{
    res.render('pages/extras/succesForm', {
        navLocation: 'doc'
    })
}

exports.showSucces = (req,res,next) => {
    DoctorRepository.getDoctors()
        .then(docs =>{
            res.render('pages/doctors/succesDoc',{
                docs: docs,
                navLocation: 'doc'
            });
        });

}   

exports.addDoctorRegister = (req,res,next) => {
    const docData = { ...req.body };
    console.log(docData);
    console.log('xd');
    DoctorRepository.addDoctorRegister(docData)
        .then(result => {
            res.redirect('/');
        }).catch(errors => { 
            errors.details.forEach(e =>{
                e.message=req.__(e.message);
            })  
            res.render('pages/doctors/doc_register', {
            doc: docData,
            pageTitle: req.__('doc.form.register.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('doc.form.addNew'),
            formAction: '/addUser',
            navLocation: 'doc',
            validationErrors: errors.details
            });
        }); 

};
