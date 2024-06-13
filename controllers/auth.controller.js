// Desc       Get login page
// Route      GET /auth/login
// Access     Public
const getLoginPage = async (req, res) => {
  try {
    return res.render("auth/login", {
      title: "Login",
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
    return res.redirect("/dashboard");
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
// Access     Private
const registerUser = async (req, res) => {
  try {
    console.log("req -------------->", req.body);

    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    req.flash("error", "Example");

    return res.redirect("/auth/register");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLoginPage,
  loginUser,
  getRegisterPage,
  registerUser,
};
