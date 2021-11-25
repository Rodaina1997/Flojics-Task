const { request } = require('express');
const Joi = require('joi');

function validate(request) {
    // Validation
    const validationSchema = Joi.object({
        email: Joi.string().required().email(),
        name: Joi.string().required(),
        phone: Joi.string().length(11).regex(/(01)[0-9]{9}/).required()
    });
    return validationSchema.validate(request.body);

}

module.exports = {
    validate: validate
};