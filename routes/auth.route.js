const { Router } = require("express");

const router = Router();

const { getLoginPage } = require("../controllers/auth.controller");

router.get("/login", getLoginPage);

module.exports = router;
