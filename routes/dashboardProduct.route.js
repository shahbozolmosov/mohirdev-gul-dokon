const { Router } = require("express");
const router = Router();
const {
  getProductsPage,
  getProductsAddPage,
  addNewProduct,
} = require("../controllers/product.controller");
const { protected } = require("../middlewares/auth");

// Products
router.get("/", protected, getProductsPage);
router.get("/add", protected, getProductsAddPage);
router.post("/add", protected, addNewProduct);

module.exports = router;
