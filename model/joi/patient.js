const { array } = require('joi');
const Joi = require('joi');


const errMessages = (errors) =>{
    errors.forEach(err =>{
        switch(err.code){
            case "string.empty":
                err.message = "doc.error.req";
                break;
            case "string.min":
                err.message = "doc.error.znakimin";
                break;
            case "string.max":
                err.message = "doc.error.znakimax";
                 break;
            default:
                break;

        }
    });
    return errors;
}

const patientSchema = Joi.object({
    IdPatient: Joi.number().optional().allow(""),
    Name: Joi.string().min(3).max(30).required().error(errMessages),
    LastName: Joi.string().min(3).max(30).required().error(errMessages),
    Disease: Joi.string().optional().allow("")

});

module.exports = patientSchema;

