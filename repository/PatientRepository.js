const db = require('../config/mysql2/db');
const patientSchema = require('../model/joi/patient');

exports.getPatients = () => {

    return db.promise().query('SELECT * FROM PATIENT')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};


exports.getPatientById = (IdPatient) => {

    const query = 'Select * FROM Patient WHERE IdPatient = ?'
    return db.promise().query(query,[IdPatient])
        .then((results,fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            const patient = {
                IdPatient: IdPatient,
                Name: firstRow.Name,
                LastName: firstRow.LastName,
                Disease: firstRow.Disease
            }

            return patient;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })

};




exports.addPatient = (newPatientData) => {

    const vRes = patientSchema.validate(newPatientData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }


    const Name = newPatientData.Name;
    const LastName = newPatientData.LastName;
    const Disease = newPatientData.Disease;

    const sql = 'INSERT into Patient (Name,LastName,Disease) VALUES (?,?,?)';
    return db.promise().execute(sql,[Name,LastName,Disease]);
};

exports.updatePatient = (IdPatient,patientData) => {

    const vRes = patientSchema.validate(patientData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }


    const IdPatient2 = IdPatient;
    const Name = patientData.Name;
    const LastName = patientData.LastName;
    const Disease = patientData.Disease;
    
    const sql = 'UPDATE Patient set Name = ?, LastName = ?, Disease = ? WHERE IdPatient = ?';
    return db.promise().execute(sql,[Name,LastName,Disease,IdPatient2]);
};

exports.deletePatient = (IdPatient) => {

    const sql1 = 'DELETE FROM VISIT WHERE IdPatient = ?';
    const sql2 = 'DELETE FROM PATIENT WHERE IdPatient = ?';
    return db.promise().execute(sql1,[IdPatient])
        .then(()=>{
            return db.promise().execute(sql2,[IdPatient]);
        });

};
