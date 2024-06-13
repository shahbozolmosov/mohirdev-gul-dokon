const { Router } = require("express");

const router = Router();

const { getDashboardPage } = require("../controllers/dashboard.controller");

router.get("/", getDashboardPage);

module.exports = router;
