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
router.post(
  "/register",
  [
    body("firstName", "Name can contain only alphabetic characters").isAlpha(),
    body("lastName", "Name can contain only alphabetic characters").isAlpha(),
    body("email", "Please enter a valid email address").isEmail(),
    body(
      "password",
      "Please enter password with minimum 6 characters and with alphabetical and numeric values"
    )
      .isLength({ min: 6 })
      .isAlphanumeric(),
  ],
  guest,
  registerUser
);
router.get("/logout", protected, logout);

module.exports = router;
