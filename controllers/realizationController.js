const RealizationRepository = require('../repository/RealizationRepository');
const DoctorRepository = require('../repository/DoctorsRepository');
const MedicalServiceRepository = require('../repository/MedicalServiceRepository');


exports.showRealizationList = (req,res,next) => {
    let alert = "";
    let allRealizations;
    RealizationRepository.getRealizations()
        .then(realizations =>{
            allRealizations = realizations
            return DoctorRepository.getDoctors()
     
        }).then(docs =>
            {
                let doctors = [] ;
                for (let doc of docs){
                    let idDoc = doc.IdDoctor
                    let count = 0 ;
                    for (let rea of allRealizations){
                        if(rea.IdDoctora == idDoc){
                            count++;
                        }
                    }
                    if(count > 0){
                        doctors.push(doc)
                    }
                }
                res.render('pages/realizations/realizationList',{
                    docs: doctors,
                    realizations: allRealizations,
                    alert:alert,
                    navLocation: 'rea'
                });
            });

}   