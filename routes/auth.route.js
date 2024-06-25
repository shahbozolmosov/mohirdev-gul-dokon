const { Router } = require("express");
const { body, check } = require("express-validator");

const router = Router();

const {
  getLoginPage,
  getRegisterPage,
  registerUser,
  loginUser,
  logout,
} = require("../controllers/auth.controller");
const { guest, protected } = require("../middlewares/auth");

router.get("/login", guest, getLoginPage);
router.get("/register", guest, getRegisterPage);
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email address"),
    body("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  guest,
  loginUser
);
router.post("/register", guest, registerUser);
router.get("/logout", protected, logout);

module.exports = router;
