const { Router } = require("express");
const { guest } = require("../middlewares/auth");
const { getHomePage, getProductDetailsPage, getOrderNewPage, createNewOrder } = require("../controllers/public.controller");
const router = Router();

// Home
router.get("/", guest, getHomePage);
// Order product
router.get("/:productId/details", guest, getProductDetailsPage);
router.get("/:productId/order/new", guest, getOrderNewPage);
router.post("/:productId/order/new", guest, createNewOrder);

module.exports = router;
