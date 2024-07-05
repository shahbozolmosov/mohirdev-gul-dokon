const Router = require("express");
const router = Router();
const { protected } = require("../middlewares/auth");
const {
  getDashboardOrderPage,
  getDashboardOrderConfirmPage,
  confirmDashboardOrder,
  getDashboardCompletedOrderPage,
} = require("../controllers/dashboardOrder.controller");
const { body } = require("express-validator");

router.get("/", protected, getDashboardOrderPage);
router.get("/completed", protected, getDashboardCompletedOrderPage);
router.get("/:orderId/confirm", protected, getDashboardOrderConfirmPage);
router.post(
  "/:orderId/confirm",
  [
    body("price", "Please enter a valid price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number")
      .isFloat({ min: 0 })
      .withMessage("Price must be at least 0"),
    body("amount", "Please enter a valid amount")
      .notEmpty()
      .withMessage("Amount is required")
      .isNumeric()
      .withMessage("Amount must be a number")
      .isInt({ min: 1 })
      .withMessage("Price must be at least 1"),
  ],
  protected,
  confirmDashboardOrder
);

module.exports = router;
