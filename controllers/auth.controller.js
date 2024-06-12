// Desc       Get login page
// Route      GET /auth/login
// Access     Public
const getLoginPage = (req, res) => {
  try {
    return res.send("Login page");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getLoginPage,
};
