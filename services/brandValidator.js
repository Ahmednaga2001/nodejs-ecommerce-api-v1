const Joi = require("joi");
exports.createBrandValidator = Joi.object({
    name: Joi.string().required().min(3).max(32).trim().messages({
        'string.base': 'Brand must be a string',
        'string.empty': 'Brand is required',
        'string.min': 'Brand name must be at least 3 characters long',
        'string.max': 'Brand name cannot be longer than 32 characters',
        'any.required': 'Brand is requirexd',
    })
});
