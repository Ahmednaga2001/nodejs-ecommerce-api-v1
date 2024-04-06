const express = require("express")
const router = express.Router()
const validateObjectId = require("../middleware/validateObjectIdMiddleware")


const { createBrand, getBrands, getBrand, updateBrand, deleteBrand } = require("../controllers/brandController")
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { createBrandValidator } = require("../services/brandValidator")
router.route("/").post(validationMiddleware(createBrandValidator),createBrand)
    .get(getBrands)


router.route("/:id").get(validateObjectId, getBrand)
    .patch(validateObjectId, updateBrand)
    .delete(validateObjectId, deleteBrand)                 


module.exports = router    