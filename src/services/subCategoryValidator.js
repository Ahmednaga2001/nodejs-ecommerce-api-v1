const Joi = require("joi")
const Category = require("../models/categoryModel")

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
    // .custom(async (value, helpers) => {
    //     try {
    //         console.log("value" + value);
    //         const category = await Category.findById(value);
    //         if (!category) {
    //             return helpers.message('Category does not exist');
    //         }
    //         return value;
    //     } catch (error) {
    //         return helpers.error('Category validation failed');
    //     }
    // }),
});
