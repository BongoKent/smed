const { array } = require('joi');
const Joi = require('joi');


const errMessages = (errors) =>{
    errors.forEach(err =>{
        switch(err.code){
            case "string.empty":
                err.message = "doc.error.req";
                break;
            case "number.base":
                err.message = "doc.error.sal";
                break;
            case "string.min":
                err.message = "doc.error.znakimin";
                break;
            case "string.max":
                err.message = "doc.error.znakimax";
                 break;
            case "date.base":
                err.message = "doc.error.data";
                break;
            case "date.max":
                err.message = "doc.error.dataniezprzyszlosci";
                break;
            case "string.email":
                err.message = "doc.error.email"
            default:
                break;

        }
    });
    return errors;
}

const doctorSchema = Joi.object({
    IdDoctor: Joi.number().optional().allow(""),
    Name: Joi.string().min(3).max(30).required().error(errMessages),
    LastName: Joi.string().min(3).max(30).required().error(errMessages),
    Salary: Joi.number().required().error(errMessages),
    Specialization: Joi.string().optional().allow(""),
    EmploymentDate: Joi.date().max('now').required().error(errMessages)
});


module.exports = doctorSchema;

