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

    login(data) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(3).max(30).required()
        });
        return schema.validate(data);
    }
}

module.exports = new Validation();