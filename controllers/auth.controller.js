const db = require("../models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = db.user;

// Desc       Get login page
// Route      GET /auth/login
// Access     Public
const getLoginPage = async (req, res) => {
  try {
    const isAtuhenticated = req.session.isLogged;
    return res.render("auth/login", {
      title: "Login",
      isAtuhenticated,
      errorMessage: req.flash("error"),
    });
  } catch (error) {
    console.log(error);
  }
};

// Desc       Login user
// Route      POST /auth/login
// Access     Public
const loginUser = async (req, res) => {
  try {
    const isAuthenticated = req.session.isLogged;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("auth/login", {
        title: "Login",
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: req.body.email,
        },
      });
    }

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      const matchPassword = await bcrypt.compare(
        req.body.password,
        userExist.password
      );

      if (matchPassword) {
        req.session.isLogged = true;
        req.session.user = userExist;
        req.session.save((err) => {
          if (err) throw err;
          return res.redirect("/dashboard");
        });
      } else {
        req.flash("error", "You entered wrong email or password");
        return res.status(400).render("/auth/login", {
          title: "Login",
          isAuthenticated,
          errorMessage: req.flash("error"),
          oldInput: {
            email: req.body.email,
          },
        });
      }
    } else {
      req.flash("error", "You entered wrong email or password");
      // return res.redirect("/auth/login");
      return res.status(400).render("auth/login", {
        title: "Login",
        errorMessage: req.flash("error"),
        oldInput: {
          email: req.body.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Desc       Get register page
// Route      GET /auth/register
// Access     Public
const getRegisterPage = async (req, res) => {
  try {
    return res.render("auth/register", {
      title: "Sign up",
      errorMessage: req.flash("error"),
    });
  } catch (error) {
    console.log(error);
  }
};

// Desc       Register user
// Route      POST /auth/register
// Access     Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, password2 } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("auth/register", {
        title: "Register",
        errorMessage: errors.array()[0].msg,
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          password2,
        },
      });
    }

    // Check passwords match
    if (password !== password2) {
      req.flash("error", "Passwords doesn't match.");
      return res.redirect("auth/register");
    }

    
    
    // Check user exists
    const userExist = await User.findOne({ where: { email:"es" } });
    console.log("render 333333333333",userExist);
    return;
    if (userExist) {
      req.flash("error", "This user already exists.");
      
      return res.redirect("auth/register");
    }
    
    


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.redirect("auth/login");
  } catch (error) {
    console.log(error);
  }
};

// Desc       Logout user
// Route      GET /auth/logout
// Access     Private
const logout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};

module.exports = {
  getLoginPage,
  loginUser,
  getRegisterPage,
  registerUser,
  logout,
};
