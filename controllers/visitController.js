const VisitRepository = require('../repository/VisitRepository');
const DoctorRepository = require('../repository/DoctorsRepository');
const PatientRepository = require('../repository/PatientRepository');


exports.showVisitList = (req,res,next) => {
    let alert = "";
    VisitRepository.getVisits()
        .then(visits =>{
            for (let visit of visits){
                visit.DateVisit.setHours(visit.DateVisit.getHours() +2);
            }
            res.render('pages/visits/visitList',{
                visits: visits,
                alert:alert,
                navLocation: 'visit'
            });
        });

}   

exports.deleteVisit = (req,res,next) => {
    const IdVisit2 = req.params.IdVisit;
    VisitRepository.deleteVisit(IdVisit2)
        .then( () => {
            res.redirect('/visits');
        });
}
    
exports.showAddVisitForm = (req, res, next) => {
    let allDoctors, allPatients;
    let date = new Date();
    let minDate= date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"T"+date.getHours()+":"+date.getMinutes();
    DoctorRepository.getDoctors()
        .then( doctors=>{
            allDoctors=doctors;
            return PatientRepository.getPatients();
        })
        .then(patients =>{
            allPatients=patients;
            res.render('pages/visits/visitForm',{
                r_visit: {},
                allDoctors: allDoctors,
                allPatients: allPatients,
                minDate: minDate,
                pageTitle: req.__('visi.form.new.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('visi.form.new.btn'),
                formAction: '/visits/add',
                navLocation: 'visit',
                validationErrors: []
            })
        })
}
    
exports.showEditVisitForm = (req, res, next) => {
    const IdVisit =req.params.IdVisit;
    let allDoctors, allPatients,visit;
    let date = new Date();

    let minDate= date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"T"+date.getHours()+":"+date.getMinutes();
    VisitRepository.getVisitById(IdVisit)
        .then( res=>{
            visit=res;
          //  visit.TimeVisit.setHours(visit.TimeVisit.getHours() +2);
            return DoctorRepository.getDoctors();
        }).then( doctors=>{
        allDoctors=doctors;
        return PatientRepository.getPatients();
    })
        .then(patients =>{
            allPatients=patients;
            res.render('pages/visits/visitForm',{
                allDoctors: allDoctors,
                allPatients: allPatients,
                r_visit: visit,
                minDate: minDate,
                pageTitle: req.__('visi.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('visi.form.edit.btn'),
                formAction: '/visits/edit',
                navLocation: 'visit',
                validationErrors: []
            
            })
        })
}


exports.addVisit = (req,res,next) => {
    const visitData = { ...req.body };
    console.log(visitData);
    VisitRepository.addVisit(visitData)
    .then(result => {
      //  let alert = "Dodano wizyte! ";
   //   this.showVisitList2(req,res,next,alert);
   
        res.redirect("succes");

}).catch(err => {
  
        this.showAddVisitForm2(req,res,next,err,visitData);

        });
   

};
exports.updateVisit = (req,res,next) => {
    const IdVisit2 = req.body.IdVisit;
        const visitData = { ...req.body };
    
        VisitRepository.updateVisit(IdVisit2,visitData)
        .then(result => {
            res.redirect('succes');
        }).catch(err => {
            this.showEditVisitForm2(req,res,next,err,visitData)
            });
        
        
    
     
    }



    exports.showEditVisitForm2 = (req, res, next, err,visitData) => {
        const IdVisit =req.params.IdVisit;
        let allDoctors, allPatients,visit;
        let date = new Date();
       let minDate= date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"T"+date.getHours()+":"+date.getMinutes();
       ;
            return DoctorRepository.getDoctors()
      
            .then( doctors=>{
                allDoctors=doctors;
                return PatientRepository.getPatients();
            })
            .then(patients =>{
                 err.details.forEach(e =>{
                e.message=req.__(e.message) }  )
                allPatients=patients;
                res.render('pages/visits/visitForm',{
                    r_visit: visitData,
                    allDoctors: allDoctors,
                    allPatients: allPatients,
                    minDate: minDate,
                    pageTitle: 'Edytuj wizyte',
                    formMode: 'createNew',
                    btnLabel: req.__('visi.form.edit.btn'),
                    formAction: '/visits/edit',
                    navLocation: 'visit',
                    validationErrors: err.details
                })
            })
    }
    exports.showAddVisitForm2 = (req, res, next, err,visitData) => {
        const IdVisit =req.params.IdVisit;
        let allDoctors, allPatients,visit;
        let date = new Date();
        let minDate= date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"T"+date.getHours()+":"+date.getMinutes();
       ;
            return DoctorRepository.getDoctors()
      
            .then( doctors=>{
                allDoctors=doctors;
                return PatientRepository.getPatients();
            })
            .then(patients =>{
                err.details.forEach(e =>{
                    e.message=req.__(e.message) }  )
                allPatients=patients;
                res.render('pages/visits/visitForm',{
                    r_visit: visitData,
                    allDoctors: allDoctors,
                    allPatients: allPatients,
                    minDate: minDate,
                    pageTitle: req.__('visi.form.new.pageTitle'),
                    formMode: 'createNew',
                    btnLabel: req.__('visi.form.new.btn'),
                    formAction: '/visits/add',
                    navLocation: 'visit',
                    validationErrors: err.details
                })
            })
    }


    exports.showVisitList2 = (req,res,next,alert2) => {
        let alert =alert2 ;
        VisitRepository.getVisits()
            .then(visits =>{
                for (let visit of visits){
                    visit.DateVisit.setHours(visit.DateVisit.getHours() +2);
                }
                res.render('pages/visits/visitList',{
                    visits: visits,
                    alert:alert,
                    navLocation: 'visit'
                });
            });
    
    }   

    exports.showSucces2 = (req,res,next)=>{
        res.render('pages/extras/succesForm', {
            navLocation: 'visit'
        })
    }

    
exports.showSucces= (req,res,next) => {
    let alert = "";
    VisitRepository.getVisits()
        .then(visits =>{
            for (let visit of visits){
                visit.DateVisit.setHours(visit.DateVisit.getHours() +2);
            }
            res.render('pages/visits/succesVisit',{
                visits: visits,
                alert:alert,
                navLocation: 'visit'
            });
        });

}   
