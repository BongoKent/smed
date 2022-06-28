const { array } = require('joi');
const Joi = require('joi');


const errMessages = (errors) =>{
    errors.forEach(err =>{
        switch(err.code){
            case "string.empty":
                err.message = "visit.enterHour";
                break;
            case "date.base":
                err.message = "visit.enterDate";
                break;
            case "number.base":
                err.message = "visit.choosePerson";
                break;
            default:
                break;

        }
    });
    return errors;
}

const realizationSchema = Joi.object({
    IdRealization: Joi.number().optional().allow(""),
    IdMedicalService: Joi.number().required().error(errMessages),
    IdDoctor: Joi.number().required().error(errMessages),
    Date: Joi.date().required().error(errMessages),    
});

module.exports = realizationSchema;

