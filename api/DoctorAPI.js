const DoctorRepository = require('../repository/DoctorsRepository')

exports.getDoctors = (req,res,next) => {
    DoctorRepository.getDoctors()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getDoctorById = (req, res, next) => {
    const idDoc = req.params.idDoc;
    DoctorRepository.getDocotorById(idDoc)
        .then(doc => {
            if(!doc){
                res.status(404).json({
                    message: 'Doc with id:'+idDoc+'not found'
                })
            } else{
                res.status(200).json(doc)
            }
        });

};

exports.addDoctor = (req,res,next) =>{
    DoctorRepository.addDoctor(req.body)
        .then(newObj =>{
          res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateDoctor = (req,res,next) => {
    const idDoc = req.params.idDoc;
    DoctorRepository.updateDoctor(idDoc,req.body)
        .then(result =>{
            res.status(200).json({message: 'Doctor updated!',doc: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteDoctor = (req,res,next) =>{
    const idDoc = req.params.idDoc;
    DoctorRepository.deleteDoctor(idDoc)
        .then(result => {
            res.status(200).json({message: 'Removed doctor',doc: result});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });

};
