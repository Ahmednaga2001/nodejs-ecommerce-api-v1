const joi = require("joi");
// const { check, body } = require('express-validator');
// const validationMiddleware = require('../middleware/validationMiddleware');
exports.createCategoryValidator = 
     joi.object({
        name: joi.string().trim().min(2).max(32).required().messages({
            'string.base': 'Category must be a string',
            'string.empty': 'Category is required',
            'string.min': 'Category name must be at least 3 characters long',
            'string.max': 'Category name cannot be longer than 32 characters',
            'any.required': 'Category is required',
        }),
    })

// exports.createCategoryValidator = [
//   check('name')
//     .notEmpty()
//     .withMessage('Category required')
//     .isLength({ min: 3 })
//     .withMessage('Too short category name')
//     .isLength({ max: 32 })
//     .withMessage('Too long category name'),
//   validationMiddleware,
// ];



