const Joi = require('joi');

class Validation {
    create(data) {
        const schema = Joi.object({
            title: Joi.string().min(3).max(1000).required(),
            description: Joi.string().min(3).max(1000).required(),
            status: Joi.boolean().required()
        });
        return schema.validate(data);
    }
    
    update(data) {
        const schema = Joi.object({
            id: Joi.number().positive().required(),
            title: Joi.string().min(3).max(1000),
            description: Joi.string().min(3).max(1000),
            status: Joi.boolean()
        });
        return schema.validate(data);
    }

    params(data) {
        const schema = Joi.object({
            id: Joi.number().positive().required()
        });
        return schema.validate(data);
    }
   
    params(data) {
        const schema = Joi.object({
            skip: Joi.number().positive(),
            limit: Joi.number().positive()
        });
        return schema.validate(data);
    }
}

module.exports = new Validation();