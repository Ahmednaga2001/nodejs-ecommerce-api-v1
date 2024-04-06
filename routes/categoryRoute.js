const express = require("express")
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categoryController")
const validateObjectId = require("../middleware/validateObjectIdMiddleware")
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { createCategoryValidator } = require("../services/categoryValidator")

const router = express.Router()

router.route('/')
    .post(validationMiddleware(createCategoryValidator),createCategory)
    .get(getCategories)
router.route('/:id')
    .get(validateObjectId,getCategory)
    .patch(validateObjectId,updateCategory)
    .delete(validateObjectId,deleteCategory)



module.exports = router                 