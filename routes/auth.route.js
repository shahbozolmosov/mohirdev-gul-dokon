const { Router } = require("express");

const router = Router();

const {
  getLoginPage,
  getRegisterPage,
  registerUser,
} = require("../controllers/auth.controller");

router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);
router.post("/register", registerUser);

module.exports = router;
