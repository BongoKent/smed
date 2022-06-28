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

const visitSchema = Joi.object({
    IdVisit: Joi.number().optional().allow(""),
    IdDoctor: Joi.number().required().error(errMessages),
    IdPatient: Joi.number().required().error(errMessages),
    DateVisit: Joi.date().required().error(errMessages),
    TimeVisit: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})/).required().error(errMessages)
    
});

module.exports = visitSchema;

