const { Router } = require("express");
const router = Router();
const { getDashboardPage } = require("../controllers/dashboard.controller");
const { protected } = require("../middlewares/auth");

router.get("/", protected, getDashboardPage);

module.exports = router;
