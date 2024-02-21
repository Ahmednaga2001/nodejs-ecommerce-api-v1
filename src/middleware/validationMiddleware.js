// const { validationResult } = require('express-validator');


// // @desc Finds the validation errors in this request and wraps them in an object with handy functions
// const validationMiddleware = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(403).json({ errors: errors.array() });
//   }
//   next();
// };

// module.exports = validationMiddleware;
// const Joi = require('joi');

// exports.validationMiddleware = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);

//     if (error) {
//       // If validation fails, send a response with the error details
//       const errorMessage = error.details.map((detail) => detail.message).join(', ');
//       return res.status(400).json({ error: errorMessage });
//     }

//     // If validation passes, proceed to the next middleware or route handler
//     next();
//   };
// };
const Joi = require('joi');

exports.validationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });

      // If validation passes, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If validation fails, send a response with the error details
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
  };
};

