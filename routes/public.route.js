const { Router } = require("express");
const { guest } = require("../middlewares/auth");
const {
  getHomePage,
  getProductDetailsPage, 
  createNewOrder,
  getNewOrderPage,
} = require("../controllers/public.controller");
const { getRegionPage } = require("../controllers/region.controller");
const router = Router();

// Home
router.get("/", guest, getHomePage);
// Order product
router.get("/:productId/details", guest, getProductDetailsPage);
router.get("/:productId/order/new", guest, getNewOrderPage);
router.post("/:productId/order/new", guest, createNewOrder);

module.exports = router;
