const express = require("express")
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/productController")
const validateObjectId = require("../middleware/validateObjectIdMiddleware")
const { validationMiddleware } = require("../middleware/validationMiddleware")
const { createProductValidator } = require("../services/productValidator")


const router = express.Router()

router.route("/").post(validationMiddleware(createProductValidator),createProduct).get(getProducts)
router.route("/:id").get(validateObjectId,getProduct)
                    .patch(validateObjectId,updateProduct)
                    .delete(validateObjectId,deleteProduct) 


module.exports = router                    