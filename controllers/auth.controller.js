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

module.exports = {
  getLoginPage,
};
