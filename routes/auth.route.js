const { Router } = require("express");

const router = Router();

const {
  getLoginPage,
  getRegisterPage,
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");
const { guest } = require("../middlewares/auth");

router.get("/login", guest, getLoginPage);
router.get("/register", guest, getRegisterPage);
router.post("/login", guest, loginUser);
router.post("/register", guest, registerUser);

module.exports = router;
