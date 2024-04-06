const Joi = require("joi")
// const Category = require("../models/categoryModel")
// const { check, body } = require('express-validator');
// const validationMiddleware = require('../middleware/validationMiddleware');

exports.createsubCategoryValidator = Joi.object({
    name: Joi.string()
        .required()
        .min(3)
        .max(32)
        .trim()
        .messages({
            'string.base': 'subCategory must be a string',
            'string.empty': 'subCategory is required',
            'string.min': 'subCategory name must be at least 3 characters long',
            'string.max': 'subCategory name cannot be longer than 32 characters',
            'any.required': 'subCategory is required',
        }),
    category: Joi
        .required().messages({
            'any.required': 'categoryId is required'
        })

});
// exports.createSubCategoryValidator = [
//     check('name')
//       .notEmpty()
//       .withMessage('SubCategory required')
//       .isLength({ min: 2 })
//       .withMessage('Too short Subcategory name')
//       .isLength({ max: 32 })
//       .withMessage('Too long Subcategory name'),
//     check('category')
//       .notEmpty()
//       .withMessage('subCategory must be belong to category')
//       .isMongoId()
//       .withMessage('Invalid Category id format'),
//     validationMiddleware,
//   ];
