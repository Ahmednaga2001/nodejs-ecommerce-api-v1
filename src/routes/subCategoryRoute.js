const express = require("express")
const { createSubCategory, getSubCategory, getSubCategories, updateSubCategory, deleteSubCategory } = require("../controllers/subCategoryController")
const validateObjectId = require("../middleware/validateObjectIdMiddleware")
const { createsubCategoryValidator } = require("../services/subCategoryValidator")
const { validationMiddleware } = require("../middleware/validationMiddleware")


const router = express.Router()

router.route("/")
                .post(validationMiddleware(createsubCategoryValidator),createSubCategory)
                .get(getSubCategories)
                
router.route("/:id")
                   .get(validateObjectId , getSubCategory)  
                   .patch(validateObjectId , updateSubCategory)
                   .delete(validateObjectId , deleteSubCategory)
                   
module.exports = router                   