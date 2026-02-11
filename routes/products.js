const express = require("express")
const router = express.Router()
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    deleteProduct
} = require("../controllers/products")

router.route("/").get(getAllProducts).post(createProduct)
router.route("/:id").get(getSingleProduct).delete(deleteProduct)


module.exports = router