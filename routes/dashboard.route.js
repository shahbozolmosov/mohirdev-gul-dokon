const { Router } = require("express");
const router = Router();
const { getDashboardPage } = require("../controllers/dashboard.controller");
const { protected } = require("../middlewares/auth");
const {
  getProductsPage,
  getProductsAddPage,
} = require("../controllers/product.controller");

// Dashboard
router.get("/", protected, getDashboardPage);

// Products
router.get("/products", protected, getProductsPage);
router.get("/products/add", protected, getProductsAddPage);

module.exports = router;
