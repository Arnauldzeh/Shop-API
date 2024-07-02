const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getProductById,
  editProduct,
  deleteProduct,
} = require("../controllers/products");
const upload = require("../middleware/multer");

router.get("/", getProducts);
router.post("/", upload.single("productImage"), newProduct);
router.get("/:productId", getProductById);
router.patch("/:productId", editProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
