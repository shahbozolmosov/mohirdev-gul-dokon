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
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLoginPage,
  loginUser,
  getRegisterPage,
};
