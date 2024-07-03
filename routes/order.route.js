const Router = require("express");
const router = Router();

const { guest } = require("../middlewares/auth");
const {
  getNewOrderPage,
  addNewOrder,
} = require("../controllers/order.controller");

// Order product
router.get("/:productId/new", guest, getNewOrderPage);
router.post("/:productId/new", guest, addNewOrder);

module.exports = router;
