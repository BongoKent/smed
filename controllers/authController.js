const DoctorRepository = require('../repository/DoctorsRepository')
const authUtil = require('../util/authUtils')

exports.login = (req, res, next) => {
    const email = req.body.Email;
    const password = req.body.Pass;

    console.log(email + ' ' + password)
    DoctorRepository.findByEmail(email)
        .then(Doctor => {
            console.log(Doctor.Pass)
            if (!Doctor) {
                console.log('1');
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('docd.worngPass')
                })
            } else if (authUtil.comparePasswords(password, Doctor.Pass) === true && Doctor.isAdmin) {

                req.session.isAdmin = true;
                req.session.loggedUser = Doctor;
                res.redirect('/');
            }
            
            else if (authUtil.comparePasswords(password, Doctor.Pass) === true) {
                req.session.isAdmin = false;
                req.session.loggedUser = Doctor;
                res.redirect('/');
            }
           else {
            console.log('2');

                res.render('index', {
                    navLocation: '',
                    loginError: req.__('docd.worngPass')
                })
            }
        })
        .catch(err => {
            err.details.forEach(e =>{
                e.message=req.__(e.message);
            })  
            console.log(err);
            res.render('index', {
                navLocation: '',
                loginError: req.__('docd.worngPass')
            })
        })
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    req.session.isAdmin = false;

    res.redirect('/');
}

exports.register = (req, res, next) => {
    res.render('pages/doctors/doc_register', {
        doc: {},
        pageTitle: req.__('doc.form.add.pageTitleRegister'),
        formMode: 'createNew',
        btnLabel: req.__('form.addNewRegister'),
        formAction: '/addUser',
        navLocation: 'doc',
        validationErrors: []
    })
}