const Joi = require("joi");
// const { check, body } = require('express-validator');
// const validationMiddleware = require('../middleware/validationMiddleware');
exports.createBrandValidator = Joi.object({
    name: Joi.string().required().min(3).max(32).trim().messages({
        'string.base': 'Brand must be a string',
        'string.empty': 'Brand is required',
        'string.min': 'Brand name must be at least 3 characters long',
        'string.max': 'Brand name cannot be longer than 32 characters',
        'any.required': 'Brand is requirexd',
    })
});

// exports.createBrandValidator = [
//     check('name')
//       .notEmpty()
//       .withMessage('Brand required')
//       .isLength({ min: 3 })
//       .withMessage('Too short Brand name')
//       .isLength({ max: 32 })
//       .withMessage('Too long Brand name'),
      
//     validationMiddleware,
//   ];