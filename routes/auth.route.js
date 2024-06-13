const { Router } = require("express");

const router = Router();

const {
  getLoginPage,
  getRegisterPage,
} = require("../controllers/auth.controller");

router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);

module.exports = router;
