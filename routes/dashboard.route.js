const { Router } = require("express");
const router = Router();
const { getDashboardPage } = require("../controllers/dashboard.controller");
const { protected } = require("../middlewares/auth");
const { getProductsPage } = require("../controllers/product.controller");

// Dashboard
router.get("/", protected, getDashboardPage);

// Products
router.get("/products", protected, getProductsPage);

module.exports = router;
