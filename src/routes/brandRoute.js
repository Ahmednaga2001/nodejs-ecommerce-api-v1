const express = require("express")
const router = express.Router()
const validationMiddleware = require("../middleware/validationMiddleware")
const validateObjectId = require("../middleware/validateObjectIdMiddleware")

const { createBrandValidator } = require("../services/brandValidator")
const { createBrand, getBrands, getBrand, updateBrand, deleteBrand } = require("../controllers/brandController")
router.route("/").post(validationMiddleware(createBrandValidator), createBrand)
    .get(getBrands)


router.route("/:id").get(validateObjectId, getBrand)
    .patch(validateObjectId, updateBrand)
    .delete(validateObjectId, deleteBrand)                 


module.exports = router    