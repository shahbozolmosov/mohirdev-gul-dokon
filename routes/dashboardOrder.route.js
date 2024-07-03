const Router = require("express");
const router = Router();
const { protected } = require("../middlewares/auth");
const {
  getDashboardOrderPage,
} = require("../controllers/dashboardOrder.controller");

router.get("/", protected, getDashboardOrderPage);

module.exports = router;
