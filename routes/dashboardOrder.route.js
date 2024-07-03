const Router = require("express");
const router = Router();
const { protected } = require("../middlewares/auth");
const {
  getDashboardOrderPage,
  getDashboardOrderConfirmPage,
} = require("../controllers/dashboardOrder.controller");

router.get("/", protected, getDashboardOrderPage);
router.get("/:orderId/confirm", protected, getDashboardOrderConfirmPage);

module.exports = router;
