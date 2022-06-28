const db = require('../config/mysql2/db');
const doctorSchema = require('../model/joi/doctor');
const doctorRegisterSchema = require('../model/joi/doctorRegister');

const authUtil = require('../util/authUtils')
exports.getDoctors = () => {

    return db.promise().query('SELECT * FROM DOCTOR')
        .then((results,fields)=> {
            console.log(results[0]);
            return results[0];
        })
        .catch(err =>{
            console.log(err);
            throw err;
        })
};


exports.getDocotorById = (IdDoctor) => {

    const query = 'Select * FROM DOCTOR WHERE IdDoctor = ?'
    return db.promise().query(query,[IdDoctor])
        .then((results,fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            const doc = {
                IdDoctor: IdDoctor,
                Name: firstRow.Name,
                LastName: firstRow.LastName,
                Salary: firstRow.Salary,
                Specialization: firstRow.Specialization,
                EmploymentDate: firstRow.EmploymentDate.toISOString().split('T')[0],
                Email: firstRow.Email,
                Pass: firstRow.Pass,
                isAdmin: firstRow.isAdmin
            }

            return doc;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })

};




exports.addDoctor = (newDocData) => {

    const vRes = doctorSchema.validate(newDocData, {abortEarly: false});

    if(vRes.error){
        console.log("ERROR");
        return Promise.reject(vRes.error);
    }


    const Name = newDocData.Name;
    const LastName = newDocData.LastName;
    const Salary = newDocData.Salary;
    const Specialization = newDocData.Specialization;
    const EmploymentDate = newDocData.EmploymentDate;
    const Email = ""
    const Pass = ""


    const sql = 'INSERT into Doctor (Name,LastName,Salary,Specialization,EmploymentDate,Email,Pass,isAdmin) VALUES (?,?,?,?,?,?,?,false)';
    console.log(newDocData);
    console.log("KOK");

    return db.promise().execute(sql,[Name,LastName,Salary,Specialization,EmploymentDate,Email,Pass]);
};

exports.addDoctorRegister = (newDocData) => {
    console.log('jestem w repository');

    const vRes = doctorRegisterSchema.validate(newDocData, {abortEarly: false});

    if(vRes.error){
        console.log('jestem w repository ERROR');

        return Promise.reject(vRes.error);
    }


    const Name = newDocData.Name;
    const LastName = newDocData.LastName;
    const Salary = 0;
    const Specialization = 'undefined';
    const EmploymentDate = '10.10.1010'
    const Email = newDocData.Email;
    const Pass = authUtil.hashPassword(newDocData.Pass);
    console.log('jestem w repository 2 ');


    const sql = 'INSERT into Doctor (Name,LastName,Salary,Specialization,EmploymentDate,Email,Pass,isAdmin) VALUES (?,?,?,?,?,?,?,false)';
  //  console.log(newDocData);
    console.log('xd');
    return db.promise().execute(sql,[Name,LastName,Salary,Specialization,EmploymentDate,Email,Pass]);
};



exports.updateDoctor = (idDoc,docData) => {

    console.log(docData);
    const vRes = doctorSchema.validate(docData, {abortEarly: false});

    if(vRes.error){
        console.log("ERROR")
        return Promise.reject(vRes.error);
    }

    const IdDoctor = idDoc;
    const Name = docData.Name;
    const LastName = docData.LastName;
    const Salary = docData.Salary;
    const Specialization = docData.Specialization;
    const EmploymentDate = docData.EmploymentDate;


    const sql = 'UPDATE Doctor set Name = ?, LastName = ?, Salary = ?, Specialization = ?,EmploymentDate = ? WHERE IdDoctor = ?';
    return db.promise().execute(sql,[Name,LastName,Salary,Specialization,EmploymentDate,IdDoctor]);
};

exports.deleteDoctor = (idDoc) => {

    const sql1 = 'DELETE FROM VISIT WHERE IdDoctor = ?';
    const sql2 = 'DELETE FROM DOCTOR WHERE IdDoctor = ?';
    return db.promise().execute(sql1,[idDoc])
        .then(()=>{
            return db.promise().execute(sql2,[idDoc]);
        });

};


exports.findByEmail = (Email) => {
    console.log('ROBIE FINDA')
    const query = 'Select * FROM DOCTOR WHERE Email = ?'
    return db.promise().query(query,[Email])
        .then((results,fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            const doc = {
                IdDoctor: firstRow.IdDoctor,
                Name: firstRow.Name,
                LastName: firstRow.LastName,
                Salary: firstRow.Salary,
                Specialization: firstRow.Specialization,
                EmploymentDate: firstRow.EmploymentDate.toISOString().split('T')[0],
                Email: Email,
                Pass: firstRow.Pass,
                isAdmin: firstRow.isAdmin
            }

            return doc;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })

};

exports.updateDoctorAdmin = (idDoc,docData) => {

    console.log(docData)
   const vRes = doctorRegisterSchema.validate(docData, {abortEarly: false});

   if(vRes.error){
        console.log("error w admin pass edit")
        return Promise.reject(vRes.error);
    }

    const IdDoctor = idDoc;
    const Email = docData.Email;
    const Pass = authUtil.hashPassword(docData.Pass);
    const isAdmin = docData.isAdmin;
    const sql = 'UPDATE Doctor set Email = ?, Pass = ?, isAdmin = ? WHERE IdDoctor = ?';
    console.log("updateAdminRepo")
    return db.promise().execute(sql,[Email,Pass,isAdmin,IdDoctor]);
};