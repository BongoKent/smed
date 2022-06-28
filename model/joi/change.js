const { array } = require('joi');
const Joi = require('joi');


const errMessages = (errors) =>{
    errors.forEach(err =>{
        switch(err.code){
            case "string.empty":
                err.message = "doc.error.req";
                break;
            case "number.base":
                err.message = "med.change.err";
                break;
            case "string.min":
                err.message = "doc.error.znakimin";
                break;
            case "string.max":
                err.message = "medical.max100";
                 break;
            default:
                break;

        }
    });
    return errors;
}

const changeSchema = Joi.object({
    Change: Joi.number().required().error(errMessages)
});


module.exports = changeSchema;
