// const { check, body } = require('express-validator');
// const validationMiddleware = require('../middleware/validationMiddleware');
// const Category = require('../models/categoryModel');

// exports.createProductValidator = [
//   check('title')
//     .isLength({ min: 3 })
//     .withMessage('must be at least 3 chars')
//     .notEmpty()
//     .withMessage('Product required'),

//   check('description')
//     .notEmpty()
//     .withMessage('Product description is required')
//     .isLength({ max: 200 })
//     .withMessage('Too long description'),
//   check('quantity')
//     .notEmpty()
//     .withMessage('Product quantity is required')
//     .isNumeric()
//     .withMessage('Product quantity must be a number'),
//   check('sold')
//     .optional()
//     .isNumeric()
//     .withMessage('Product quantity must be a number'),
//   check('price')
//     .notEmpty()
//     .withMessage('Product price is required')
//     .isNumeric()
//     .withMessage('Product price must be a number')
//     .isLength({ max: 32 })
//     .withMessage('To long price'),
//   check('priceAfterDiscount')
//     .optional()
//     .isNumeric()
//     .withMessage('Product priceAfterDiscount must be a number')
//     .toFloat()
//     .custom((value, { req }) => {
//       if (req.body.price <= value) {
//         throw new Error('priceAfterDiscount must be lower than price');
//       }
//       return true;
//     }),

//   check('colors')
//     .optional()
//     .isArray()
//     .withMessage('availableColors should be array of string'),
//   check('imageCover').notEmpty().withMessage('Product imageCover is required'),
//   check('images')
//     .optional()
//     .isArray()
//     .withMessage('images should be array of string'),
//   check('category')
//     .notEmpty()
//     .withMessage('Product must be belong to a category')
//     .isMongoId()
//     .withMessage('Invalid ID formate')
//     .custom((categoryId) =>
//       Category.findById(categoryId).then((category) => {
//         if (!category) {
//           return Promise.reject(
//             new Error(`No category for this id: ${categoryId}`)
//           );
//         }
//       })
//     ),

//   check('subcategories')
//     .optional()
//     .isMongoId()
//     .withMessage('Invalid ID formate'),

//   check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
//   check('ratingsAverage')
//     .optional()
//     .isNumeric()
//     .withMessage('ratingsAverage must be a number')
//     .isLength({ min: 1 })
//     .withMessage('Rating must be above or equal 1.0')
//     .isLength({ max: 5 })
//     .withMessage('Rating must be below or equal 5.0'),
//   check('ratingsQuantity')
//     .optional()
//     .isNumeric()
//     .withMessage('ratingsQuantity must be a number'),

//   validationMiddleware,
// ];

// // exports.getProductValidator = [
// //   check('id').isMongoId().withMessage('Invalid ID formate'),
// //   validationMiddleware,
// // ];

// // exports.updateProductValidator = [
// //   check('id').isMongoId().withMessage('Invalid ID formate'),
// //   body('title')
// //     .optional()
// //     .custom((val, { req }) => {
// //       req.body.slug = slugify(val);
// //       return true;
// //     }),
// //   validationMiddleware,
// // ];

// // exports.deleteProductValidator = [
// //   check('id').isMongoId().withMessage('Invalid ID formate'),
// //   validationMiddleware,
// // ];


const Joi = require('joi');
const validationMiddleware = require('../middleware/validationMiddleware');
const Category = require('../models/categoryModel');
const SubCategory = require("../models/subCategoryModel")
const { isValidObjectId } = require("mongoose")

exports.createProductValidator =
  Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.min': 'Title must be at least 3 characters',
      'any.required': 'Product title is required',
    }),
    description: Joi.string().max(200).required().messages({
      'string.max': 'Description is too long (maximum 200 characters)',
      'any.required': 'Product description is required',
    }),
    quantity: Joi.number().required().messages({
      'number.base': 'Product quantity must be a number',
      'any.required': 'Product quantity is required',
    }),
    sold: Joi.number().optional().messages({
      'number.base': 'Product quantity must be a number',
    }),
    price: Joi.number().max(32).required().messages({
      'number.base': 'Product price must be a number',
      'number.max': 'Price is too long (maximum 32 characters)',
      'any.required': 'Product price is required',
    }),
    priceAfterDiscount: Joi.number().optional().custom((value, helpers) => {
      const { state } = helpers;
      const price = state.ancestors[0].price
      console.log(price)
      if (price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return value;
    }).messages({
      'number.base': 'Product priceAfterDiscount must be a number',
    }),
    colors: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'availableColors should be an array of strings',
    }),
    imageCover: Joi.string().required().messages({
      'string.base': 'Product imageCover must be a string',
      'any.required': 'Product imageCover is required',
    }),
    images: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'images should be an array of strings',
    }),
    category: Joi.required().external(async (categoryId, helpers) => {
      try {

        if (!isValidObjectId(categoryId)) {
          return helpers.message("Invalid category Id format")
        }
        else {
          const category = await Category.findById(categoryId)
          if (!category) return helpers.message(`No category for this id : ${categoryId}`)
          return true
        }
      }
      catch (e) {
        return helpers.error(e.message)
      }
    })
      .messages({
        'any.required': 'Product must belong to a category',
        'string.base': 'Invalid category ID format',
      }),
    subcategories: Joi.array().optional().external(async (subIds, helpers) => {
      let isValid = true;  
      try {  
        for (const subId of subIds) {
          if (!isValidObjectId(subId)) {
            isValid = false;  
            return helpers.message("Invalid subcategory ID format");
          }
        }
        if (isValid) {
          const subcategories = await SubCategory.find({ _id: { $exists: true, $in: subIds } });
          if(subcategories.length < 1 || subcategories.length !== subIds.length) {
            return helpers.message("subcategories not belong to category")
        }
        return subcategories
      }
  
      } catch (e) {
        helpers.error(e.message);
      }
    }),
    brand: Joi.string().optional().messages({
      'string.base': 'Invalid brand ID format',
    }),
    ratingsAverage: Joi.number().min(1).max(5).optional().messages({
      'number.base': 'ratingsAverage must be a number',
      'number.min': 'Rating must be above or equal 1.0',
      'number.max': 'Rating must be below or equal 5.0',
    }),
    ratingsQuantity: Joi.number().optional().messages({
      'number.base': 'ratingsQuantity must be a number',
    }),
  })


