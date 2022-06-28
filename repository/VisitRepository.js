const db = require('../config/mysql2/db');
const visitSchema = require('../model/joi/visit');

exports.getVisits = () => {

    return db.promise().query('SELECT d.Email as "IdDoctora", v.IdVisit,d.Name AS "docName" ,d.LastName AS "docLastName",p.Name AS "patientName",p.LastName AS "patientLastName",v.DateVisit FROM VISIT v,DOCTOR d,PATIENT p WHERE v.IdDoctor = d.IdDoctor AND v.IdPatient = p.IdPatient ')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};

exports.deleteVisit = (IdVisit) => {
    const sql1 = 'DELETE FROM VISIT WHERE IdVisit = ?';
    return db.promise().execute(sql1,[IdVisit]);

};

exports.addVisit = (newVisitData) => {

    const vRes = visitSchema.validate(newVisitData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }


    const IdDoctor = newVisitData.IdDoctor;
    const IdPatient = newVisitData.IdPatient;
    const DateVisit = newVisitData.DateVisit ;
    const TimeVisit = newVisitData.TimeVisit;
   
  //  const FinalDate=  DateVisit.getDate()+"-"+DateVisit.getMonth()+"-"+DateVisit.getFullYear()+"T"+TimeVisit.getHours()+":"+TimeVisit.getMinutes() + ":00.000Z";
    const FinalDate2=  DateVisit+ " "+ TimeVisit + ":00" ;
    console.log(FinalDate2);

    const sql = 'INSERT into Visit (IdDoctor,IdPatient,DateVisit) VALUES (?,?,?)';
    return db.promise().execute(sql,[IdDoctor,IdPatient,FinalDate2]);
};

exports.updateVisit = (IdVisit,newVisitData) => {

    const vRes = visitSchema.validate(newVisitData, {abortEarly: false});

    if(vRes.error){
        return Promise.reject(vRes.error);
    }

    const IdVisit2 = IdVisit;
    const IdDoctor = newVisitData.IdDoctor;
    const IdPatient = newVisitData.IdPatient;
    const DateVisit = newVisitData.DateVisit;
    const TimeVisit = newVisitData.TimeVisit;
    const FinalDate2=  DateVisit+ " "+ TimeVisit ;

    const sql = 'UPDATE Visit set IdDoctor = ?, IdPatient = ?, DateVisit = ? WHERE IdVisit = ?';
    return db.promise().execute(sql,[IdDoctor,IdPatient,FinalDate2,IdVisit2]);
};


exports.getVisitById = (IdVisit) => {

    const query = 'Select * FROM Visit WHERE IdVisit = ?'
    return db.promise().query(query,[IdVisit])
        .then((results,fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            
            firstRow.DateVisit.setHours( firstRow.DateVisit.getHours() +2);

            const visit = {
                IdVisit: IdVisit,
                IdDoctor: firstRow.IdDoctor,
                IdPatient: firstRow.IdPatient,
                DateVisit: firstRow.DateVisit.toISOString().split('T')[0],
                TimeVisit: firstRow.DateVisit.toISOString().split('T')[1].substring(0,8) 
            }
            
                console.log(visit);
            return visit;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })

};

