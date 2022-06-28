const db = require('../config/mysql2/db');
const realizationSchema = require('../model/joi/realization');

exports.getRealizations = () => {

    return db.promise().query('select r.IdDoctor as "IdDoctora", COUNT(r.IdMedicalService) as "RealizationCount",d.Name as "DoctorName",d.LastName as "DoctorLastName",m.Name as "MedicalServiceName" from realization r,doctor d,medicalservice m where r.IdDoctor = d.IdDoctor and r.IdMedicalService = m.IdMedicalService group by r.IdDoctor,r.IdMedicalService  ')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};
