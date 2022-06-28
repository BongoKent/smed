const db = require('../config/mysql2/db');
const medicalServiceSchema = require('../model/joi/medicalService');
const authUtil = require('../util/authUtils')
const changeSchema = require('../model/joi/change');



exports.getmedicalService = () => {

    return db.promise().query('SELECT * FROM medicalService')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};

exports.getmedicalServiceSortAlfa = () => {

    return db.promise().query('SELECT * FROM medicalService order by name')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};


exports.getmedicalServiceSortPrice = () => {

    return db.promise().query('SELECT * FROM medicalService order by price')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};

exports.getmedicalServiceSortPricedesc = () => {

    return db.promise().query('SELECT * FROM medicalService order by price desc')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};


exports.updatePrices = (Change) => {

  //  const vRes = changeSchema.validate(Change, {abortEarly: false});

  //  if(vRes.error){
  //      console.log("ERROR");
  //      return Promise.reject(vRes.error);
  //  }
    const change = Change;
   
    const sql = 'UPDATE medicalservice m set m.Price = m.Price + ?';
    return db.promise().execute(sql,[change]);
};

exports.updatePrices2 = (Change) => {

    const change = Change;
   
    const sql = 'UPDATE medicalservice m set m.Price = m.Price * ?';
    return db.promise().execute(sql,[change]);
};


exports.addMedicalService = (newServiceData) => {

    const vRes = medicalServiceSchema.validate(newServiceData, {abortEarly: false});

    if(vRes.error){
        console.log("ERROR");
        return Promise.reject(vRes.error);
    }


    const Name = newServiceData.Name;
    const Price = newServiceData.Price;
   


    const sql = 'INSERT into MedicalService (Name,Price) VALUES (?,?)';

    return db.promise().execute(sql,[Name,Price]);
};

exports.deleteMedicalService = (idMed) => {

    const sql1 = 'DELETE FROM Realization WHERE IdMedicalService = ?';
    const sql2 = 'DELETE FROM MedicalService WHERE IdMedicalService = ?';
    return db.promise().execute(sql1,[idMed])
        .then(()=>{
            return db.promise().execute(sql2,[idMed]);
        });

};
