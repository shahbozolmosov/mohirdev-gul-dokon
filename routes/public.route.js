const { Router } = require("express");
const { guest } = require("../middlewares/auth");
const { getHomePage, getOrderProductPage } = require("../controllers/public.controller");
const router = Router();

// Home
router.get("/", guest, getHomePage);
// Order product
router.get("/:productId/order", guest, getOrderProductPage);

module.exports = router;
