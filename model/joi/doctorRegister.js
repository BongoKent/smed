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

const doctorRegisterSchema = Joi.object({
    IdDoctor: Joi.number().optional().allow(""),
    Name: Joi.string().min(3).max(30).required().error(errMessages),
    LastName: Joi.string().min(3).max(30).required().error(errMessages),
    Email: Joi.string().email().required().error(errMessages),
    Pass: Joi.string().min(3).required().error(errMessages),
    isAdmin: Joi.string().valid('0','1').required()
});


module.exports = doctorRegisterSchema;

