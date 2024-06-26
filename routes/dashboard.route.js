const { Router } = require("express");
const router = Router();
const { getDashboardPage } = require("../controllers/dashboard.controller");
const { protected } = require("../middlewares/auth");

// Dashboard
router.get("/", protected, getDashboardPage);

module.exports = router;
